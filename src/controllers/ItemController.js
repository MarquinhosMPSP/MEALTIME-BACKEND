const knex = require('../database');

module.exports = {
    async index(req, res, next) { 
        try {
            const results = await knex('item')
            return res.json(results)
        } catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { categoria, preco, nome, descricao, disponivel, tempoPreparo, pratoImagem } = req.body

            await knex('item').insert({
                categoria, preco, nome, descricao, disponivel, tempoPreparo, pratoImagem
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { categoria, preco, nome, descricao, disponivel, tempoPreparo, pratoImagem } = req.body
            const { idItem } = req.params

            await knex('item')
            .update({
                categoria, preco, nome, descricao, disponivel, tempoPreparo, pratoImagem
            })
            .where({ idItem })

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { idItem } = req.params

            await knex('item')
            .where({ idItem })
            .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    }
}