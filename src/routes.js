const express = require('express')
const routes = express.Router()

const UsuarioController = require('./controllers/UsuarioController')
const ItemController = require('./controllers/ItemController')
const MesaController = require('./controllers/MesaController')

routes
    // Usuario
    .get('/usuarios', UsuarioController.index)
    .post('/usuarios', UsuarioController.create)
    .put('/usuarios/:idUsuario', UsuarioController.update)
    .delete('/usuarios/:idUsuario', UsuarioController.delete)
    // Item
    .get('/itens', ItemController.index)
    .post('/itens', ItemController.create)
    .put('/itens/:idItem', ItemController.update)
    .delete('/itens/:idItem', ItemController.delete)
    // Mesa
    .get('/mesas', MesaController.index)
    .post('/mesas', MesaController.create)
    .put('/mesas/:idMesa', MesaController.update)
    .delete('/mesas/:idMesa', MesaController.delete)

module.exports = routes