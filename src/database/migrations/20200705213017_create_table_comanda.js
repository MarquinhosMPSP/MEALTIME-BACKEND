
const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async knex => knex.schema.createTable('comanda', table => {
    table.increments('idComanda')
    table.integer('idRestaurante')
        .references('restaurante.idRestaurante')
        .notNullable()
        .onDelete('CASCADE')

    table.timestamp('dt_criacao').defaultTo(knex.fn.now())
    table.timestamp('dt_atualizacao').defaultTo(knex.fn.now())

}).then(() => knex.raw(onUpdateTrigger('comanda')))

exports.down = async knex => knex.schema.dropTable('comanda')
