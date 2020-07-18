const db = require('../database')
const { categorias } = require('../enums/categorias')

module.exports = {
    async index(req, res, next) {
        try {
            const restaurantes = await db('restaurante')
            return res.json(restaurantes)
        } catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { nomeRestaurante, descricao, categoria, cnpj, endereco, numero, bairro, cep, cidade, estado, aberto } = req.body

            await db('restaurante')
            .insert({
                nomeRestaurante, descricao, categoria, cnpj, endereco, numero, bairro, cep, cidade, estado, aberto
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { nomeRestaurante, descricao, categoria, cnpj, endereco, numero, bairro, cep, cidade, estado, aberto } = req.body

            const { idRestaurante } = req.params

            await db('restaurante')
            .update({
                nomeRestaurante, descricao, categoria, cnpj, endereco, numero, bairro, cep, cidade, estado, aberto
            })
            .where({ idRestaurante })

            return res.send()
        } catch (error) {
            next(error)
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
            next(error)
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
            next(error)
        }
    }
}