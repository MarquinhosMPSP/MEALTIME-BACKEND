const db = require('../database')
const { calculateTotalValue } = require('../services/util')

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
            
            await db('pedido')
            .update({ idComanda, idItem, status })
            .where({ idPedido })

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
                    .select('pedido.idPedido', 'pedido.idComanda', 'pedido.status', 'item.*')

                resultado.valorTotal = calculateTotalValue(resultado.pedidos, 'preco')

                return res.json(resultado)
            }

            resultado.pedidos = await db('pedido')
                .where({ idComanda })
                .join('item', 'pedido.idItem', 'item.idItem')
                .select('pedido.idPedido', 'pedido.idComanda', 'pedido.status', 'item.*')

            resultado.valorTotal = calculateTotalValue(resultado.pedidos, 'preco')

            return res.json(resultado)
        } catch (error) {
            return next(error)
        }
    },
    async listOrdersByUser(req, res, next) {
        try {
            const { idUsuario } = req.params

            const query = req.query
            
            let filters = []
            let filtersKey = Object.keys(query)
            let resultado = { valorTotal: 0, pedidos: null }

            if (filtersKey.length > 0) {
                filters = filtersKey.map(key => ({column: key, order: query[key]}))
                resultado.pedidos = await db('pedido')
                    .where({ idUsuario })
                    .join('item', 'pedido.idItem', 'item.idItem')
                    .orderBy(filters)
                    .select('pedido.idPedido', 'pedido.idComanda', 'pedido.status', 'item.*')

                resultado.valorTotal = calculateTotalValue(resultado.pedidos, 'preco')
                return res.json(resultado)
            }

            resultado.pedidos = await db('pedido')
                .where({ idUsuario })
                .join('item', 'pedido.idItem', 'item.idItem')
                .select('pedido.idPedido', 'pedido.idComanda', 'pedido.status', 'item.*')

            resultado.valorTotal = calculateTotalValue(resultado.pedidos, 'preco')
            return res.json(resultado)

        } catch (error) {
            return next(error)
        }
    },
    async listOrdersByRestaurant(req, res, next) {
        try {
            const { idRestaurante } = req.params
            
            let resultado = {}

            const comandas = await db('comanda')
                .where({ idRestaurante })
                .select('comanda.idComanda')

            if (comandas && comandas.length > 0) {
                const idsComanda = comandas.map(c => c.idComanda)
                const pedidos = await db('pedido')
                    .whereIn('idComanda', idsComanda)
                    .join('item', 'pedido.idItem', 'item.idItem')
                    .select('pedido.idPedido', 'pedido.idComanda', 'pedido.status', 'item.*')

                idsComanda.forEach(comanda => {
                    const pedidosComanda = pedidos.filter(p => p.idComanda === comanda)
                    if (pedidosComanda && pedidosComanda.length > 0) {
                        resultado[comanda] = {}
                        resultado[comanda].pedidos = pedidosComanda 
                        resultado[comanda].valorTotal = calculateTotalValue(resultado[comanda].pedidos, 'preco')
                    }
                })
            }

            return res.json(resultado)

        } catch (error) {
            return next(error)
        }
    }
}