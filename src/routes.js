const routes = require('express').Router()
const validateToken = require('./middlewares/auth')

// controllers
const AuthController = require('./controllers/AuthController')
const UsuarioController = require('./controllers/UsuarioController')
const ItemController = require('./controllers/ItemController')
const MesaController = require('./controllers/MesaController')
const RestauranteController = require('./controllers/RestauranteController')
const ReservaController = require('./controllers/ReservaController')

// rotas da aplicação
routes
    // Autenticação
    .post('/login', AuthController.login)

    // Usuario
    .get('/usuarios', UsuarioController.index)
    .post('/usuarios', validateToken, UsuarioController.create)
    .put('/usuarios/:idUsuario', UsuarioController.update)
    .delete('/usuarios/:idUsuario', validateToken, UsuarioController.delete)

    // Item
    .get('/itens', ItemController.index)
    .get('/itens/filtro', ItemController.listByFilter)
    .post('/itens', validateToken, ItemController.create)
    .put('/itens/:idItem', validateToken, ItemController.update)
    .delete('/itens/:idItem', validateToken, ItemController.delete)

    // Mesa
    .get('/mesas', MesaController.index)
    .get('/mesas/restaurante/:idRestaurante', MesaController.listByRestaurant)
    .post('/mesas', validateToken, MesaController.create)
    .put('/mesas/:idMesa', validateToken, MesaController.update)
    .delete('/mesas/:idMesa', validateToken, MesaController.delete)
    // Restaurante
    .get('/restaurantes', RestauranteController.index)
    .get('/restaurantes/categoria/:categoria', RestauranteController.listByCategory)
    .post('/restaurantes', validateToken, RestauranteController.create)
    .put('/restaurantes/:idRestaurante', validateToken, RestauranteController.update)
    .delete('/restaurantes/:idRestaurante', validateToken, RestauranteController.delete)

    // Reservas
    .get('/reservas', ReservaController.index)
    .get('/reservas/filtro', ReservaController.listByFilter)
    .post('/reservas', validateToken, ReservaController.create)
    .put('/reservas/:idRestaurante', validateToken, ReservaController.update)
    .delete('/reservas/:idRestaurante', validateToken, ReservaController.delete)

module.exports = routes