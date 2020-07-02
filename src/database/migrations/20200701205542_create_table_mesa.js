const { onUpdateTrigger } = require('../../../knexfile')

exports.up = async knex => knex.schema.createTable('mesa', table => {
    table.increments('idMesa')
    table.text('nomeMesa')
    table.integer('quantidadeLugares')
    table.boolean('disponivel')

    table.timestamps(true, true)
  }).then(() => knex.raw(onUpdateTrigger('mesa')))

exports.down = async knex => knex.schema.dropTable('mesa')
