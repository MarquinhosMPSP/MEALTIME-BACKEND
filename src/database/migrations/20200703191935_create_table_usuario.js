const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async knex => knex.schema.createTable('usuario', table => {
    table.increments('idUsuario')
    table.text('username')
    table.text('password')

    table.timestamps(true, true)
}).then(() => knex.raw(onUpdateTrigger('usuario')))

exports.down = async knex => knex.schema.dropTable('usuario')
