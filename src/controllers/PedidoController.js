const db = require('../database')
const { calcularValorTotal } = require('../services/pedido')

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

                resultado.valorTotal = calcularValorTotal(resultado.pedidos)

                return res.json(resultado)
            }

            resultado.pedidos = await db('pedido')
                .where({ idComanda })
                .join('item', 'pedido.idItem', 'item.idItem')
                .select('pedido.idPedido', 'pedido.idComanda', 'pedido.status', 'item.*')

            resultado.valorTotal = calcularValorTotal(resultado.pedidos)

            return res.json(resultado)
        } catch (error) {
            return next(error)
        }
    }
}