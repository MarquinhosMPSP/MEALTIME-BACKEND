const db = require("../database")
const util = require('../services/util')
const notificationService = require('../services/notification')

module.exports = {
    async index(req, res, next) {
        try {
            const reservas = await db('reserva').orderBy('dataReserva', 'desc')
            return res.json(reservas)
        } catch (error) {
            return next(error)
        }
    },
    async create(req, res, next) {
        try {
            let { idRestaurante, idCliente, idMesa, status, pagamentoApp, dataReserva } = req.body

            const [ idComanda ] = await db('comanda').insert({ idRestaurante }).returning('idComanda')

            if (req.data.idPerfil === 3) status = 'ativa'

            const [ idReserva ] = await db('reserva')
            .insert({
                idRestaurante, idCliente, idMesa, idComanda, status, pagamentoApp, dataReserva
            }).returning('idReserva')

            const [{ nome, nomeRestaurante, nomeMesa }] = await db('reserva')
                .where('reserva.idReserva', idReserva)
                .join('usuario', 'reserva.idCliente', 'usuario.idUsuario')
                .join('restaurante', 'reserva.idRestaurante', 'restaurante.idRestaurante')
                .join('mesa', 'reserva.idMesa', 'mesa.idMesa')
                .select('usuario.nome', 'usuario.login', 'restaurante.nomeRestaurante', 'mesa.nomeMesa')

            const body = { idComanda, dataReserva, nome, nomeMesa, route: '/home/reservas' }
            notificationService.notifyOne('nova reseva', body, nomeRestaurante)

            return res.status(201).json({ idComanda, nome, nomeRestaurante, nomeMesa, dataReserva })
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { idRestaurante, idCliente, idMesa, idComanda, status, pagamentoApp } = req.body

            const { idReserva } = req.params

            const reserva = await db('reserva')
            .update({
                idRestaurante, idCliente, idMesa, idComanda, status, pagamentoApp
            })
            .where({ idReserva })
            .returning("*")

            if (reserva && reserva.length > 0) {
                notificationService.notifyOne('atualizou reserva', reserva, String(reserva[0].idCliente))
            }

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
            delete query.idRestaurante
            
            let dataReservaInicio = null
            let dataReservaFim = null

            if (Object.keys(query).length > 0) {
                if ('dataReserva' in query) {
                    dataReservaInicio = query.dataReserva
                    delete query.dataReserva
                }
                let sql = db('reserva')
                    .where(query)
                    .where('reserva.idRestaurante', req.data && req.data.idRestaurante)
                    .leftJoin('usuario', 'usuario.idUsuario', 'reserva.idCliente')
                    .leftJoin('mesa', 'mesa.idMesa', 'reserva.idMesa')
                    .select('reserva.*', 'usuario.nome', 'usuario.idPerfil', 'mesa.nomeMesa')
                if (dataReservaInicio) {
                    dataReservaFim = util.getLastMinute(dataReservaInicio)
                    sql.whereBetween('dataReserva', [dataReservaInicio, dataReservaFim])
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

            if (!dataReserva) dataReserva = new Date()

            let duracaoReserva = new Date(dataReserva)
            duracaoReserva.setUTCHours(duracaoReserva.getUTCHours() - 2)

            const mesas = await db('mesa')
                .where('mesa.quantidadeLugares', qtdPessoas)
                .where('mesa.idRestaurante', idRestaurante)

            const mesasReservadas = await db('reserva')
                .where('reserva.idRestaurante', idRestaurante)
                .whereNotIn('reserva.status', ['finalizada', 'cancelada'])
                .whereBetween('reserva.dataReserva', [duracaoReserva.toISOString(), dataReserva])
                .select('reserva.idMesa')

            const idsReservadas = mesasReservadas.map(r => r.idMesa)
            const mesasDisponiveis = mesas.filter(m => !idsReservadas.includes(m.idMesa))

            return res.json({ mesas, mesasReservadas, mesasDisponiveis })
        } catch (error) {
            return next(error)
        }
    },
    async getAllBookingsByUser(req, res, next) {
        try {
            const { idCliente } = req.params

            const reservasAbertas = await db('reserva')
                .where({ idCliente })
                .whereIn('status', ['criada', 'aceita', 'ativa'])
                .join('mesa', 'mesa.idMesa', 'reserva.idMesa')
                .join('restaurante', 'restaurante.idRestaurante', 'reserva.idRestaurante')

            return res.json({ reservasAbertas })
        } catch (error) {
            return next(error)
        }
    },
    async getAllBookingsByRestaurant(req, res, next) {
        try {
            const { idRestaurante } = req.params

            const dataReservaInicio = util.getFirstMinute(new Date())
            const dataReservaFim = util.getLastMinute(new Date())
            
            const reservas = await db('reserva')
                .where('reserva.idRestaurante', idRestaurante)
                .whereBetween('reserva.dataReserva', [dataReservaInicio, dataReservaFim])
                .leftJoin('pedido', 'reserva.idComanda', 'pedido.idComanda')
                .leftJoin('item', 'pedido.idItem', 'item.idItem')
                .select(['reserva.idReserva', 'reserva.dataReserva', 'reserva.status', 'pedido.idItem', 'pedido.idComanda', 'item.*'])

            const idsComanda = reservas.map(r => r.idComanda)

            

            return res.json(reservas)

        } catch (error) {
            return next(error)
        }
    },
    async getOrderPadAndTableByRestaurant(req, res, next) {
        try {
            const { idRestaurante } = req.params

            const dataReservaInicio = util.getFirstMinute(new Date())
            const dataReservaFim = util.getLastMinute(new Date())

            const comandasEMesas = await db('reserva')
                .where('reserva.idRestaurante', idRestaurante)
                .whereBetween('reserva.dataReserva', [dataReservaInicio, dataReservaFim])
                .where('status', 'ativa')
                .join('mesa', 'mesa.idMesa', 'reserva.idMesa')
                .join('comanda', 'comanda.idComanda', 'reserva.idComanda')
                .select(['comanda.*', 'mesa.*'])

            return res.json(comandasEMesas)

        } catch (error) {
            return next(error)
        }
    },
    async getFidelizationData(req, res, next) {
        try {
            const {idRestaurante} = req.data || req.body
            const response = await db('reserva')
                .where('reserva.status', 'finalizada')
                .where('reserva.idRestaurante', idRestaurante)
                .join('usuario', 'usuario.idUsuario', 'reserva.idCliente')
                .where('usuario.idPerfil', 1)
                .groupBy(['reserva.idCliente', 'usuario.nome'])
                .count('reserva.idCliente')
                .select(['reserva.idCliente', 'usuario.nome'])
            return res.json(response)
        } catch (error) {
            return next(error)
        }
    },
}