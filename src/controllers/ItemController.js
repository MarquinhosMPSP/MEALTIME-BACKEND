const db = require('../database');

module.exports = {
    async index(req, res, next) {
        try {
            const results = await db('item')
            return res.json(results)
        } catch (error) {
            return next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { nome, preco, descricao, disponivel, tempoPreparo, pratoImgUrl, promocao, idRestaurante } = req.body

            precoCalculado = (preco - (preco * (promocao || 0) / 100)).toFixed(2)

            const [idItem] = await db('item')
                .insert({
                    nome, preco, descricao, disponivel, tempoPreparo, pratoImgUrl, promocao, precoCalculado
                })
                .returning('idItem')

            if (!idItem) return res.status(500).json({ data: 'Não foi possivel criar o item.' })

            let cardapio = await db('cardapio')
                .where({ idRestaurante })
                .select('idCardapio')
                .first('idCardapio')

            // if (!cardapio || !cardapio.idCardapio) return res.status(500).json({ data: 'Não existe um cárdapio para associar o item.' })

            if (!cardapio || !cardapio.idCardapio) {
                const result = await db('cardapio')
                    .insert({ idCardapio: 1, idItem, idRestaurante })
                    .where({ idRestaurante })
                    .returning('*')
                cardapio = result && result.length > 0 ? result[0] : null
            }

            if (cardapio) {
                await db('cardapio')
                    .insert({ idCardapio: cardapio.idCardapio, idRestaurante, idItem })
            }

            return res.status(201).send()
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { nome, preco, descricao, disponivel, tempoPreparo, pratoImgUrl, promocao } = req.body
            const { idItem } = req.params

            precoCalculado = (preco - (preco * (promocao || 0) / 100)).toFixed(2)

            await db('item')
                .update({
                    nome, preco, descricao, disponivel, tempoPreparo, pratoImgUrl, promocao, precoCalculado
                })
                .where({ idItem })

            return res.send()
        } catch (error) {
            return next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { idItem } = req.params

            await db('item')
                .where({ idItem })
                .del()

            return res.send()
        } catch (error) {
            return next(error)
        }
    },
    async listByFilter(req, res, next) {
        try {
            const query = req.query

            let filtersKey = Object.keys(query)
            let filters = []

            if (filtersKey.length > 0) {
                filters = filtersKey.map(key => ({ column: key, order: query[key] }))
                const itens = await db('item').orderBy(filters)
                return res.json(itens)
            }
            return res.json({ message: 'nenhum filtro foi informado!' })
        } catch (error) {
            return next(error)
        }
    },
    async setPromotion(req, res, next) {
        try {
            const { promocao, idItem } = req.body

            const item = await db('item').where({ idItem }).first()

            const precoCalculado = (item.preco - (item.preco * ((promocao || 0) / 100))).toFixed(2)

            await db('item').where({ idItem }).update({ promocao, precoCalculado })

            return res.send()
        } catch (error) {
            return next(error)
        }
    },
    async listItemsByMenu(req, res, next) {
        try {
            const {idRestaurante} = req.data || {idRestaurante: null}
            const results = await db('cardapio')
                .join('item', 'item.idItem', 'cardapio.idItem')
                .where({idRestaurante})
            return res.json(results)
        } catch (error) {
            return next(error)
        }
    },
}