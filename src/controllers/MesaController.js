const db = require('../database');

module.exports = {
    async index(req, res, next) { 
        try {
            const results = await db('mesa')
            return res.json(results)
        } catch (error) {
            next(error)
        }
    },
    async create(req, res) {
        try {
            const { idRestaurante, nomeMesa, quantidadeLugares, disponivel } = req.body
    
            await db('mesa').insert({
                idRestaurante, nomeMesa, quantidadeLugares, disponivel
            })

            return res.status(200).send()
        } catch (error) {
            return res.status(500).send()
        }
    },
    async update(req, res, next) {
        try {
            const { idRestaurante, nomeMesa, quantidadeLugares, disponivel } = req.body
            const { idMesa } = req.params
            
            await db('mesa')
            .update({ idRestaurante, nomeMesa, quantidadeLugares, disponivel })
            .where({ idMesa })
            
            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { idMesa } = req.params
        
            await db('mesa')
            .where({ idMesa })
            .del()
            
            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async listByRestaurant(req, res, next) {
        try {
            const { idRestaurante } = req.params
    
            const result = await db('mesa').where({ idRestaurante })
    
            return res.json(result)
        } catch (error) {
            next(error)            
        }
    }
}