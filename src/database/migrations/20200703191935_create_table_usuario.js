const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async knex => knex.schema.createTable('usuario', table => {
    table.increments('idUsuario')
    table.text('nome').notNullable()
    table.text('login').unique().notNullable()
    table.text('senha').notNullable()

    table.timestamp('dt_criacao').defaultTo(knex.fn.now())
    table.timestamp('dt_atualizacao').defaultTo(knex.fn.now())
}).then(() => knex.raw(onUpdateTrigger('usuario')))

exports.down = async knex => knex.schema.dropTable('usuario')
