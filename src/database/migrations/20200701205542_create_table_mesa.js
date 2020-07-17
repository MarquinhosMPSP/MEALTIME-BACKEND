const { onUpdateTrigger } = require('../../../knexfile')

exports.up = async knex => knex.schema.createTable('mesa', table => {
    table.increments('idMesa')
    table.integer('idRestaurante')
        .references('restaurante.idRestaurante')
        .notNullable()
        .onDelete('CASCADE')
    table.text('nomeMesa').notNullable()
    table.integer('quantidadeLugares').defaultTo(1)
    table.boolean('disponivel').defaultTo(true)

    table.timestamp('dataCriacao').defaultTo(knex.fn.now())
    table.timestamp('dataAtualizacao').defaultTo(knex.fn.now())
  }).then(() => knex.raw(onUpdateTrigger('mesa')))

exports.down = async knex => knex.schema.dropTable('mesa')
