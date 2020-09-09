const { onUpdateTrigger } = require('../../../knexfile')

exports.up = async knex => knex.schema.createTable('item', table => {
    table.increments('idItem')
    table.text('nome').notNullable()
    table.float('preco').notNullable()
    table.float('promocao').notNullable().defaultTo(0)
    table.float('precoCalculado')
    table.text('descricao').notNullable()
    table.boolean('disponivel').defaultTo(true)
    table.float('tempoPreparo')
    table.text('pratoImgUrl')

    table.timestamp('dt_criacao').defaultTo(knex.fn.now())
    table.timestamp('dt_atualizacao').defaultTo(knex.fn.now())
  }).then(() => knex.raw(onUpdateTrigger('item')))

exports.down = async knex => knex.schema.dropTable('item')

