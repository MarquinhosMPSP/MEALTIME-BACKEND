const { onUpdateTrigger } = require('../../../knexfile')

exports.up = async knex => knex.schema.createTable('item', table => {
    table.increments('idItem')
    table.text('categoria')
    table.float('preco')
    table.text('nome')
    table.text('descricao')
    table.boolean('disponivel')
    table.float('tempoPreparo')
    table.text('pratoImagem')

    table.timestamps(true, true)
  }).then(() => knex.raw(onUpdateTrigger('item')))

exports.down = async knex => knex.schema.dropTable('item')

