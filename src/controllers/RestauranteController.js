const db = require('../database')
const { categorias } = require('../enums/categorias')

module.exports = {
    async index(req, res, next) {
        try {
            const restaurantes = await db('restaurante')

            const categorias = restaurantes.reduce((total, curr) => {
                if (total.includes(curr.categoria)) return [...total]
                return [...total, curr.categoria]
            }, [])

            let lista = []

            categorias.forEach(c => {
                let restaurantesPorCategoria = restaurantes.filter(r => r.categoria === c)
                lista.push({ categoria: c, restaurantes: restaurantesPorCategoria, qtd: restaurantesPorCategoria.length })
            })

            return res.json(lista)
        } catch (error) {
            return next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { nomeRestaurante, descricao, categoria, cnpj, endereco, numero, bairro, cep, cidade, estado, aberto } = req.body

            if (categoria && !(categoria.toLowerCase() in categorias)) {
                return res.status(404).json({ message: 'categoria inválida!' })
            }

            await db('restaurante')
            .insert({
                nomeRestaurante, descricao, categoria, cnpj, endereco, numero, bairro, cep, cidade, estado, aberto
            })

            return res.status(201).send()
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { nomeRestaurante, descricao, categoria, cnpj, endereco, numero, bairro, cep, cidade, estado, aberto } = req.body

            const { idRestaurante } = req.params

            if (categoria && !(categoria.toLowerCase() in categorias)) {
                return res.status(404).json({ message: 'categoria inválida!' })
            }

            await db('restaurante')
            .update({
                nomeRestaurante, descricao, categoria, cnpj, endereco, numero, bairro, cep, cidade, estado, aberto
            })
            .where({ idRestaurante })

            return res.send()
        } catch (error) {
            return next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { idRestaurante } = req.params

            await db('restaurante')
            .where({ idRestaurante })
            .del()

            return res.send()
        } catch (error) {
            return next(error)
        }
    },
    async listByCategory(req, res, next) {
        try {
            let { categoria } = req.params

            categoria = categoria ? categoria.toLowerCase() : ''

            if (categoria in categorias) {
                const restaurantes = await db('restaurante')
                    .where(
                        db.raw('LOWER("categoria") = ?', categoria)
                    )
                    .orderBy('nomeRestaurante')
                return res.json(restaurantes)
            }
            return res.status(404).json({ message: 'categoria inválida!' })
        } catch (error) {
            return next(error)
        }
    }
}