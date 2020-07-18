const express = require('express')
const routes = express.Router()

const UsuarioController = require('./controllers/UsuarioController')
const ItemController = require('./controllers/ItemController')
const MesaController = require('./controllers/MesaController')
const RestauranteController = require('./controllers/RestauranteController')

routes
    // Usuario
    .get('/usuarios', UsuarioController.index)
    .post('/usuarios', UsuarioController.create)
    .put('/usuarios/:idUsuario', UsuarioController.update)
    .delete('/usuarios/:idUsuario', UsuarioController.delete)
    // Item
    .get('/itens', ItemController.index)
    .get('/itens/filtro', ItemController.listByFilter)
    .post('/itens', ItemController.create)
    .put('/itens/:idItem', ItemController.update)
    .delete('/itens/:idItem', ItemController.delete)
    // Mesa
    .get('/mesas', MesaController.index)
    .get('/mesas/restaurante/:idRestaurante', MesaController.listByRestaurant)
    .post('/mesas', MesaController.create)
    .put('/mesas/:idMesa', MesaController.update)
    .delete('/mesas/:idMesa', MesaController.delete)
    // Restaurante
    .get('/restaurantes', RestauranteController.index)
    .get('/restaurantes/categoria/:categoria', RestauranteController.listByCategory)
    .post('/restaurantes', RestauranteController.create)
    .put('/restaurantes/:idRestaurante', RestauranteController.update)
    .delete('/restaurantes/:idRestaurante', RestauranteController.delete)

module.exports = routes