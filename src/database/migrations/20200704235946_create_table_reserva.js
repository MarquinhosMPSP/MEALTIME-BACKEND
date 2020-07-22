
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

    table.enum('status', ['criada', 'aceita', 'finalizada', 'cancelada']).notNullable().defaultTo('criada')
    table.boolean('pagamentoApp').defaultTo(true)
        
    table.timestamp('dataReserva').defaultTo(knex.fn.now())
    table.timestamp('dt_criacao').defaultTo(knex.fn.now())
    table.timestamp('dt_atualizacao').defaultTo(knex.fn.now())
}).then(() => knex.raw(onUpdateTrigger('reserva')))

exports.down = async knex => knex.schema.dropTable('reserva')
