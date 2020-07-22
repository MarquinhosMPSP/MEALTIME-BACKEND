
const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async knex => knex.schema.createTable('perfil', table => {
    table.increments('idPerfil')
    table.text('tipoPerfil')
    
    table.timestamp('dt_criacao').defaultTo(knex.fn.now())
    table.timestamp('dt_atualizacao').defaultTo(knex.fn.now())

}).then(() => knex.raw(onUpdateTrigger('perfil')))

exports.down = async knex => knex.schema.dropTable('perfil')
