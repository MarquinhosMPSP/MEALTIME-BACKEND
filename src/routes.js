const routes = require('express').Router()
const validateToken = require('./middlewares/auth')

// controllers
const AuthController = require('./controllers/AuthController')
const UsuarioController = require('./controllers/UsuarioController')
const ItemController = require('./controllers/ItemController')
const MesaController = require('./controllers/MesaController')
const RestauranteController = require('./controllers/RestauranteController')
const ReservaController = require('./controllers/ReservaController')
const ComandaController = require('./controllers/ComandaController')
const PedidoController = require('./controllers/PedidoController')
const PerfilController = require('./controllers/PerfilController')

// rotas da aplicação
routes
    // Autenticação
    .post('/login', AuthController.login)
    // Usuarios
    .get('/usuarios', UsuarioController.index)
    .post('/usuarios', validateToken, UsuarioController.create)
    .put('/usuarios/:idUsuario', UsuarioController.update)
    .delete('/usuarios/:idUsuario', validateToken, UsuarioController.delete)
    // Itens
    .get('/itens', ItemController.index)
    .get('/itens/filtro', ItemController.listByFilter)
    .post('/itens', validateToken, ItemController.create)
    .put('/itens/:idItem', validateToken, ItemController.update)
    .delete('/itens/:idItem', validateToken, ItemController.delete)
    // Mesas
    .get('/mesas', MesaController.index)
    .get('/mesas/restaurante/:idRestaurante', MesaController.listByRestaurant)
    .post('/mesas', validateToken, MesaController.create)
    .put('/mesas/:idMesa', validateToken, MesaController.update)
    .delete('/mesas/:idMesa', validateToken, MesaController.delete)
    // Restaurantes
    .get('/restaurantes', RestauranteController.index)
    .get('/restaurantes/categoria/:categoria', RestauranteController.listByCategory)
    .post('/restaurantes', validateToken, RestauranteController.create)
    .put('/restaurantes/:idRestaurante', validateToken, RestauranteController.update)
    .delete('/restaurantes/:idRestaurante', validateToken, RestauranteController.delete)
    // Reservas
    .get('/reservas', ReservaController.index)
    .get('/reservas/filtro', ReservaController.listByFilter)
    .get('/reservas/:idRestaurante/disponibilidade', ReservaController.availability)
    .post('/reservas', validateToken, ReservaController.create)
    .put('/reservas/:idReserva', validateToken, ReservaController.update)
    .delete('/reservas/:idReserva', validateToken, ReservaController.delete)
    .delete('/reservas', validateToken, ReservaController.deleteAll)
    // Comandas
    .get('/comandas', ComandaController.index)
    .post('/comandas', validateToken, ComandaController.create)
    .put('/comandas/:idComanda', validateToken, ComandaController.update)
    .delete('/comandas/:idComanda', validateToken, ComandaController.delete)
    // Pedidos
    .get('/pedidos', PedidoController.index)
    .get('/pedidos/:idComanda', PedidoController.listOrdersByOrderPad) // lista os pedidos pela comanda (+filtros)
    .post('/pedidos', validateToken, PedidoController.create)
    .put('/pedidos/:idPedido', validateToken, PedidoController.update)
    .delete('/pedidos/:idPedido', validateToken, PedidoController.delete)
    // Perfis
    .get('/perfis', PerfilController.index)
    .post('/perfis', validateToken, PerfilController.create)
    .put('/perfis/:idPerfil', validateToken, PerfilController.update)
    .delete('/perfis/:idPerfil', validateToken, PerfilController.delete)

module.exports = routes