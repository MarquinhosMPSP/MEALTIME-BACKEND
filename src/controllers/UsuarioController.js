const db = require('../database')

module.exports = {
    async index(req, res, next) { 
        try {
            const {idRestaurante} = req.data
            const results = await db('usuario').where({idRestaurante})
            return res.json(results)
        } catch (error) {
            return next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { nome, login, senha, idPerfil=1, idRestaurante } = req.body

            await db('usuario').insert({
                nome, login, senha, idPerfil, idRestaurante
            })

            return res.status(201).send()
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { nome, login, senha, idPerfil, idRestaurante } = req.body
            const { idUsuario } = req.params
            
            await db('usuario')
            .update({ nome, login, senha, idPerfil, idRestaurante })
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