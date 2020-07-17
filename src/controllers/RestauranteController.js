const knex = require('knex')

module.exports = {
    async index(req, res, next) {
        try {
            const restaurantes = await knex('restaurante')
            return res.json(restaurantes)
        } catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { idItem, idMesa, nomeRestaurante, descricao, categoria, cidade, estado, bairro, rua, cep, numero, cnpj, aberto, horarioAbertura, horarioFechamento } = req.body

            await knex('restaurante')
            .insert({
                idItem, idMesa, nomeRestaurante, descricao, categoria, cidade, estado, bairro, rua, cep, numero, cnpj, aberto, horarioAbertura, horarioFechamento
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { idItem, idMesa, nomeRestaurante, descricao, categoria, cidade, estado, bairro, rua, cep, numero, cnpj, aberto, horarioAbertura, horarioFechamento } = req.body

            const { idRestaurante } = req.params

            await knex('restaurante')
            .update({
                idItem, idMesa, nomeRestaurante, descricao, categoria, cidade, estado, bairro, rua, cep, numero, cnpj, aberto, horarioAbertura, horarioFechamento
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

            await knex('restaurante')
            .where({ idRestaurante })
            .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },
}