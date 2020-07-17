
const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async knex => knex.schema.createTable('cardapio', table => {
    table.integer('idCardapio').notNullable()
    table.integer('idRestaurante')
        .references('restaurante.idRestaurante')
        .notNullable()
        .onDelete('CASCADE')
    table.integer('idItem')
        .references('item.idItem')
        .notNullable()
        .onDelete('CASCADE')

    table.timestamp('dataCriacao').defaultTo(knex.fn.now())
    table.timestamp('dataAtualizacao').defaultTo(knex.fn.now())

    table.primary(['idCardapio', 'idRestaurante', 'idItem'])
}).then(() => knex.raw(onUpdateTrigger('cardapio')))

exports.down = async knex => knex.schema.dropTable('cardapio')
