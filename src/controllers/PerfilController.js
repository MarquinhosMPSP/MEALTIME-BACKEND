const db = require('../database')

module.exports = {
    async index(req, res, next) { 
        try {
            const results = await db('perfil')
            return res.json(results)
        } catch (error) {
            return next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { tipoPerfil } = req.body

            await db('perfil').insert({
                tipoPerfil
            })

            return res.status(201).send()
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { tipoPerfil } = req.body
            const { idPerfil } = req.params
            
            await db('perfil')
            .update({ tipoPerfil })
            .where({ idPerfil })

            return res.send()

        } catch (error) {
            return next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { idPerfil } = req.params

            await db('perfil')
            .where({ idPerfil })
            .del()

            return res.send()
        } catch (error) {
            return next(error)
        }
    }
}