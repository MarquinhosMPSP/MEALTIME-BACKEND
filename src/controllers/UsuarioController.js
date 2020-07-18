const db = require('../database')

module.exports = {
    async index(req, res, next) { 
        try {
            const results = await db('usuario')
            return res.json(results)
        } catch (error) {
            return next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { nome, login, senha } = req.body

            await db('usuario').insert({
                nome, login, senha
            })

            return res.status(201).send()
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { nome, login, senha } = req.body
            const { idUsuario } = req.params
            
            await db('usuario')
            .update({ nome, login, senha })
            .where({ idUsuario })

            return res.send()

        } catch (error) {
            return next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { idUsuario } = req.params

            await db('usuario')
            .where({ idUsuario })
            .del()

            return res.send()
        } catch (error) {
            return next(error)
        }
    }
}