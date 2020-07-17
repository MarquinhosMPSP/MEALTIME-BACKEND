
const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async knex => knex.schema.createTable('comanda', table => {
    table.integer('idComanda').notNullable()
    table.integer('idRestaurante')
        .references('restaurante.idRestaurante')
        .notNullable()
        .onDelete('CASCADE')
    table.integer('idPedido')
        .references('pedido.idPedido')
        .notNullable()
        .onDelete('CASCADE')

    table.timestamp('dataCriacao').defaultTo(knex.fn.now())
    table.timestamp('dataAtualizacao').defaultTo(knex.fn.now())

    table.primary(['idComanda', 'idRestaurante', 'idPedido'])
}).then(() => knex.raw(onUpdateTrigger('comanda')))

exports.down = async knex => knex.schema.dropTable('comanda')
