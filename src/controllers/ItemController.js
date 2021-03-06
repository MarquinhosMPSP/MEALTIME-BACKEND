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
            const { nome, preco, descricao, disponivel, tempoPreparo, pratoImgUrl } = req.body

            await db('item').insert({
                nome, preco, descricao, disponivel, tempoPreparo, pratoImgUrl
            })

            return res.status(201).send()
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { nome, preco, descricao, disponivel, tempoPreparo, pratoImgUrl } = req.body
            const { idItem } = req.params

            await db('item')
            .update({
                nome, preco, descricao, disponivel, tempoPreparo, pratoImgUrl
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
            return res.json({ message: 'nenhum filtro foi informado!'})
        } catch (error) {
            return next(error)
        }
    }
}