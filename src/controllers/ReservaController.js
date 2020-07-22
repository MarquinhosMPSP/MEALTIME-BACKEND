const db = require("../database")

module.exports = {
    async index(req, res, next) {
        try {
            const reservas = await db('reserva')
            return res.json(reservas)
        } catch (error) {
            return next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { idRestaurante, idCliente, idMesa, idComanda, ativa, pagamentoApp, dataReserva } = req.body

            await db('reserva')
            .insert({
                idRestaurante, idCliente, idMesa, idComanda, ativa, pagamentoApp, dataReserva
            })

            return res.status(201).send()
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { idRestaurante, idCliente, idMesa, idComanda, ativa, pagamentoApp } = req.body

            const { idReserva } = req.params

            await db('reserva')
            .update({
                idRestaurante, idCliente, idMesa, idComanda, ativa, pagamentoApp
            })
            .where({ idReserva })

            return res.send()
        } catch (error) {
            return next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { idReserva } = req.params

            await db('reserva')
            .where({ idReserva })
            .del()

            return res.send()
        } catch (error) {
            return next(error)
        }
    },
    async listByFilter(req, res, next) {
        try {
            const query = req.query
            
            if (Object.keys(query).length > 0) {
                const reservas = await db('reserva').where(query)
                return res.json(reservas)
            }
            return res.json({ message: 'nenhum filtro foi informado!'})
        } catch (error) {
            return next(error)
        }
    }
}