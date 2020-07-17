const { onUpdateTrigger } = require('../../../knexfile')

exports.up = async knex => knex.schema.createTable('item', table => {
    table.increments('idItem')
    table.text('categoria').notNullable()
    table.float('preco').notNullable()
    table.text('nome').notNullable()
    table.text('descricao').notNullable()
    table.boolean('disponivel').defaultTo(true)
    table.float('tempoPreparo')
    table.text('pratoImagem')

    table.timestamp('dataCriacao').defaultTo(knex.fn.now())
    table.timestamp('dataAtualizacao').defaultTo(knex.fn.now())
  }).then(() => knex.raw(onUpdateTrigger('item')))

exports.down = async knex => knex.schema.dropTable('item')

