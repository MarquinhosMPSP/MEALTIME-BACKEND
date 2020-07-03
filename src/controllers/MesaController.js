const knex = require('../database');

module.exports = {
    async index(req, res, next) { 
        try {
            const results = await knex('mesa')
            return res.json(results)
        } catch (error) {
            next(error)
        }
    },
    async create(req, res) {
        try {
            const { nomeMesa, quantidadeLugares, disponivel } = req.body
    
            await knex('mesa').insert({
                nomeMesa, quantidadeLugares, disponivel
            })

            return res.status(200).send()
        } catch (error) {
            return res.status(500).send()
        }
    },
    async update(req, res, next) {
        try {
            const { nomeMesa, quantidadeLugares, disponivel } = req.body
            const { idMesa } = req.params
            
            await knex('mesa')
            .update({ nomeMesa, quantidadeLugares, disponivel })
            .where({ idMesa })
            
            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { idMesa } = req.params
        
            await knex('mesa')
            .where({ idMesa })
            .del()
            
            return res.send()
        } catch (error) {
            next(error)
        }
    }
}