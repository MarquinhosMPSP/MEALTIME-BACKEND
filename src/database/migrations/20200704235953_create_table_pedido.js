
const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async knex => knex.schema.createTable('pedido', table => {
    table.increments('idPedido')
    table.integer('idComanda')
        .references('comanda.idComanda')
        .notNullable()
        .onDelete('CASCADE')
    table.integer('idItem')
        .references('item.idItem')
        .notNullable()
        .onDelete('CASCADE')
    table.enum('status', ['criado', 'preparando', 'finalizado'])
        .notNullable()
        .defaultTo('criado')
    table.text('observacoes')
    table.timestamp('dataPedido').defaultTo(knex.fn.now())
    table.timestamp('dt_criacao').defaultTo(knex.fn.now())
    table.timestamp('dt_atualizacao').defaultTo(knex.fn.now())

}).then(() => knex.raw(onUpdateTrigger('pedido')))

exports.down = async knex => knex.schema.dropTable('pedido')
