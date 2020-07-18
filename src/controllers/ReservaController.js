import knex from 'knex'

module.exports = {
    async index(req, res, next) {
        try {
            const reservas = await db('reserva')
            return res.json(reservas)
        } catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { idReserva, idRestaurante, idCliente, idPedido, idLugar, dataReserva, ativa, pagamentoApp } = req.body

            await db('reserva')
            .insert({
                idReserva, idRestaurante, idCliente, idPedido, idLugar, dataReserva, ativa, pagamentoApp
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const {  } = req.body

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const {  } = req.params

            return res.send()
        } catch (error) {
            next(error)
        }
    }
}