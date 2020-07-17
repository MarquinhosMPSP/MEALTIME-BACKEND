const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async knex => knex.schema.createTable('usuario', table => {
    table.increments('idUsuario')
    table.text('nome').notNullable()
    table.text('login').unique().notNullable()
    table.text('senha').notNullable()

    table.timestamp('dataCriacao').defaultTo(knex.fn.now())
    table.timestamp('dataAtualizacao').defaultTo(knex.fn.now())
}).then(() => knex.raw(onUpdateTrigger('usuario')))

exports.down = async knex => knex.schema.dropTable('usuario')
