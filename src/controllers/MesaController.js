const knex = require('../database')

module.exports = {
    async index(req, res) { 
        const results = await knex('mesa')
        .select();
        return res.json(results)
    }
}