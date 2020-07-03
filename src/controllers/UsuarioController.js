const knex = require('../database')

module.exports = {
    async index(req, res, next) { 
        try {
            const results = await knex('usuario')
            return res.json(results)
        } catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { username, password } = req.body

            await knex('usuario').insert({
                username, password
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { username, password } = req.body
            const { idUsuario } = req.params
            
            await knex('usuario')
            .update({ username, password })
            .where({ idUsuario })

            return res.send()

        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { idUsuario } = req.params

            await knex('usuario')
            .where({ idUsuario })
            .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    }
}