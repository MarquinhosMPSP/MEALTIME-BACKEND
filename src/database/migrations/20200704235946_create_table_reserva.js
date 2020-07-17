
const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async knex => knex.schema.createTable('reserva', table => {
    table.increments('idReserva')
    table.integer('idRestaurante')
        .references('restaurante.idRestaurante')
        .notNullable()
        .onDelete('CASCADE')
    table.integer('idCliente')
        .references('usuario.idUsuario')
        .notNullable()
        .onDelete('CASCADE')
    table.integer('idMesa')
        .references('mesa.idMesa')
        .notNullable()
        .onDelete('CASCADE')
    table.integer('idComanda')
        .references('comanda.idComanda')
        .notNullable()
        .onDelete('CASCADE')

    table.boolean('ativa').defaultTo(true)
    table.boolean('pagamentoApp').defaultTo(true)
        
    table.timestamp('dataReserva').defaultTo(knex.fn.now())
    table.timestamp('dataCriacao').defaultTo(knex.fn.now())
    table.timestamp('dataAtualizacao').defaultTo(knex.fn.now())
}).then(() => knex.raw(onUpdateTrigger('reserva')))

exports.down = async knex => knex.schema.dropTable('reserva')
