const db = require('../database')

module.exports = {
    async index(req, res, next) { 
        try {
            const results = await db('comanda')
            return res.json(results)
        } catch (error) {
            return next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { idRestaurante } = req.body

            await db('comanda').insert({
                idRestaurante
            })

            return res.status(201).send()
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { idRestaurante } = req.body
            const { idComanda } = req.params
            
            await db('comanda')
            .update({ idRestaurante })
            .where({ idComanda })

            return res.send()

        } catch (error) {
            return next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { idComanda } = req.params

            await db('comanda')
            .where({ idComanda })
            .del()

            return res.send()
        } catch (error) {
            return next(error)
        }
    }
}