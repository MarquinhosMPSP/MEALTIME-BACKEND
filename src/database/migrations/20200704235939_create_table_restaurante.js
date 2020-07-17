
const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async knex => knex.schema.createTable('restaurante', table => {
    table.increments('idRestaurante')
    table.text('nomeRestaurante').unique().notNullable()
    table.text('descricao').notNullable()
    table.text('categoria').notNullable()
    table.text('cnpj').notNullable()
    table.text('endereco').notNullable()
    table.integer('numero').notNullable()
    table.text('bairro').notNullable()
    table.text('cep').notNullable()
    table.text('cidade').notNullable()
    table.text('estado').notNullable()
    table.boolean('aberto').defaultTo(true)

    table.timestamp('dataCriacao').defaultTo(knex.fn.now())
    table.timestamp('dataAtualizacao').defaultTo(knex.fn.now())
}).then(() => knex.raw(onUpdateTrigger('restaurante')))

exports.down = async knex => knex.schema.dropTable('restaurante')
