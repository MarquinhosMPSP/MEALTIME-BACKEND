const db = require("../database")
const { where, whereRaw } = require("../database")

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
            const { idRestaurante, idCliente, idMesa, status, pagamentoApp, dataReserva } = req.body

            const [ idComanda ] = await db('comanda').insert({ idRestaurante }).returning('idComanda')

            console.log(idComanda);

            await db('reserva')
            .insert({
                idRestaurante, idCliente, idMesa, idComanda, status, pagamentoApp, dataReserva
            })

            return res.status(201).json({ idComanda })
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { idRestaurante, idCliente, idMesa, idComanda, status, pagamentoApp } = req.body

            const { idReserva } = req.params

            await db('reserva')
            .update({
                idRestaurante, idCliente, idMesa, idComanda, status, pagamentoApp
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
    async deleteAll(req, res, next) {
        try {
            await db('reserva')
            .del()
            return res.send()
        } catch (error) {
            return next(error)
        }
    },
    async listByFilter(req, res, next) {
        try {
            const query = req.query
            let dataReserva = null
            
            if (Object.keys(query).length > 0) {
                if ('dataReserva' in query) {
                    dataReserva = query.dataReserva
                    delete query.dataReserva
                }
                let sql = db('reserva').where(query)
                if (dataReserva) {
                    sql.whereRaw('??::date = ?', ['dataReserva', dataReserva])
                }
                const reservas = await sql.select()
                return res.json(reservas)
            }
            return res.json({ message: 'nenhum filtro foi informado!'})
        } catch (error) {
            return next(error)
        }
    },
    async availability(req, res, next) {
        try {
            const { idRestaurante } = req.params
            const { dataReserva, qtdPessoas } = req.query

            const mesas = await db('mesa')
                .where('mesa.quantidadeLugares', qtdPessoas)
                .where('mesa.idRestaurante', idRestaurante)

            const mesasReservadas = await db('mesa')
                .where('mesa.quantidadeLugares', qtdPessoas)
                .where('mesa.idRestaurante', idRestaurante)
                .whereNotIn('reserva.status', ['finalizada', 'cancelada'])
                .whereRaw('??::timestamp = ?', ['dataReserva', dataReserva])
                .join('reserva', 'reserva.idMesa', 'mesa.idMesa')
                .select('mesa.idMesa', 'reserva.idReserva', 'mesa.quantidadeLugares', 'mesa.disponivel', 'reserva.dataReserva', 'reserva.status')

            const idsReservadas = mesasReservadas.map(m => m.idMesa)
            const mesasDisponiveis = mesas.filter(m => !idsReservadas.includes(m.idMesa))

            return res.json({ mesas, mesasReservadas, mesasDisponiveis })
        } catch (error) {
            return next(error)
        }
    }
}