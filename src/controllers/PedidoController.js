const db = require('../database')
const { calculateTotalValue, isToday } = require('../services/util')
const notificationService = require('../services/notification')

module.exports = {
    async index(req, res, next) { 
        try {
            const results = await db('pedido')
            return res.json(results)
        } catch (error) {
            return next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { idComanda, idItem, status } = req.body

            await db('pedido').insert({
                idComanda, idItem, status
            })

            return res.status(201).send()
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { idComanda, idItem, status } = req.body
            const { idPedido } = req.params
            
            const pedido = await db('pedido')
            .update({ idComanda, idItem, status })
            .where({ idPedido })
            .returning('*')

            const reserva = await db('reserva')
            .where({ idComanda })
            .first()

            if (reserva && reserva.idCliente) {
                notificationService.notifyOne('atualizou pedido', pedido, String(reserva.idCliente))
            }

            return res.send()

        } catch (error) {
            return next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { idPedido } = req.params

            await db('pedido')
            .where({ idPedido })
            .del()

            return res.send()
        } catch (error) {
            return next(error)
        }
    },
    async listOrdersByOrderPad(req, res, next) {
        try {
            const { idComanda } = req.params

            const query = req.query

            let filtersKey = Object.keys(query)
            let filters = []
            let resultado = { valorTotal: 0, pedidos: null }

            if (filtersKey.length > 0) {
                filters = filtersKey.map(key => ({ column: key, order: query[key] }))
                resultado.pedidos = await db('pedido')
                    .where({ idComanda })
                    .join('item', 'pedido.idItem', 'item.idItem')
                    .orderBy(filters)
                    .select('pedido.idPedido', 'pedido.idComanda', 'pedido.status', 'pedido.dataPedido', 'item.*') // adicionar data de atualizacao do pedido

                resultado.valorTotal = calculateTotalValue(resultado.pedidos, 'preco')

                return res.json(resultado)
            }

            resultado.pedidos = await db('pedido')
                .where({ idComanda })
                .join('item', 'pedido.idItem', 'item.idItem')
                .select('pedido.idPedido', 'pedido.idComanda', 'pedido.status', 'pedido.dataPedido', 'item.*')

            resultado.valorTotal = calculateTotalValue(resultado.pedidos, 'precoCalculado')

            return res.json(resultado)
        } catch (error) {
            return next(error)
        }
    },
    async listOrdersInRestaurantByUser(req, res, next) {
        try {
            const { idUsuario, idRestaurante } = req.params

            const query = req.query
            
            let filters = []
            let filtersKey = Object.keys(query)
            let resultado = { valorTotal: 0, pedidos: null }

            if (filtersKey.length > 0) {
                filters = filtersKey.map(key => ({column: key, order: query[key]}))
                resultado.pedidos = await db('pedido')
                    .join('item', 'pedido.idItem', 'item.idItem')
                    .join('comanda', 'pedido.idComanda', 'comanda.idComanda')
                    .where('comanda.idRestaurante', idRestaurante)
                    .where('comanda.idCliente', idUsuario)
                    .orderBy(filters)
                    .select('pedido.idPedido', 'pedido.idComanda', 'pedido.status', 'item.*')

                resultado.valorTotal = calculateTotalValue(resultado.pedidos, 'preco')
                return res.json(resultado)
            }

            resultado.pedidos = await db('pedido')
                .where({ idUsuario })
                .join('item', 'pedido.idItem', 'item.idItem')
                .select('pedido.idPedido', 'pedido.idComanda', 'pedido.status', 'pedido.dataPedido', 'item.*')

            resultado.valorTotal = calculateTotalValue(resultado.pedidos, 'preco')
            return res.json(resultado)

        } catch (error) {
            return next(error)
        }
    },
    async listOrdersByRestaurant(req, res, next) {
        try {
            const { idRestaurante } = req.params
            
            let resultado = []

            const comandas = await db('comanda')
                .where({ idRestaurante })
                .select('comanda.idComanda')

            if (comandas && comandas.length > 0) {
                const idsComanda = comandas.map(c => c.idComanda)
                const pedidos = await db('pedido')
                    .whereIn('idComanda', idsComanda)
                    .join('item', 'pedido.idItem', 'item.idItem')
                    .select('pedido.idPedido', 'pedido.idComanda', 'pedido.status', 'pedido.dataPedido', 'item.*')
                    // .whereNot('pedido.status', 'finalizado')
                    .orderBy([{column: 'pedido.idComanda', order: 'desc'}, {column: 'pedido.idPedido', order: 'desc'}])
                
                const reservas = await db('reserva')
                    .whereIn('idComanda', idsComanda)
                    .join('mesa', 'mesa.idMesa', 'reserva.idMesa')
                    .select('*')

                idsComanda.forEach(async(comanda) => {
                    const pedidosComanda = pedidos.filter(p => p.idComanda === comanda)
                    const reserva = reservas.find(r => r.idComanda === comanda)
                    if (reserva) {
                        const item = {
                            reserva,
                            idComanda: comanda,
                            pedidos: pedidosComanda,
                            valorTotal: calculateTotalValue(pedidosComanda, 'precoCalculado')
                        }
                        resultado.push(item)
                    }
                })
            }
            return res.json(resultado)

        } catch (error) {
            return next(error)
        }
    },
    async makeOrder(req, res, next) {
        try {
            const { pedidos, idComanda, dataReserva, nomeRestaurante } = req.body

            if (!isToday(new Date(dataReserva))) return res.json({ data: "Somente são permitidos pedidos no dia da reserva." })

            const dataPedido = dataReserva

            if (idComanda && pedidos && pedidos.length > 0) {
                const data = await new Promise((resolve, reject) => {
                    try {
                        pedidos.forEach(async (pedido) => {
                            const idItem = pedido.idItem
                            if (idItem) {
                                const qtdItens = pedido.qtd ? pedido.qtd : 1
                                for (let index = 0; index < qtdItens; index++) {
                                    await db('pedido').insert({
                                        idComanda, idItem, dataPedido
                                    })
                                }
                                resolve("Pedido(s) criado(s) com sucesso")
                            }
                        })
                        if (nomeRestaurante && idComanda) {
                            notificationService.notifyOne('novo pedido', { idComanda, route: '/home/pedidos' }, nomeRestaurante)
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
                return res.json({ data })
            }

            return res.status(400)

        } catch (error) {
            return next(error)
        }
    }
}