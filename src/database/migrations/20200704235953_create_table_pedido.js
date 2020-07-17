
const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async knex => knex.schema.createTable('reserva', table => {
    table.increments('idPedido')
    table.integer('idComanda')
        .references('comanda.idComanda')
        .notNullable()
        .onDelete('CASCADE')
    table.integer('idItem')
        .references('item.idItem')
        .notNullable()
        .onDelete('CASCADE')

    table.enum('status', ['criado', 'preparando', 'finalizado']).notNullable().defaultTo('criado')
        
    table.timestamp('dataPedido').defaultTo(knex.fn.now())
    table.timestamp('dataCriacao').defaultTo(knex.fn.now())
    table.timestamp('dataAtualizacao').defaultTo(knex.fn.now())

    table.primary(['idPedido', 'idComanda', 'idItem'])
}).then(() => knex.raw(onUpdateTrigger('reserva')))

exports.down = async knex => knex.schema.dropTable('reserva')
