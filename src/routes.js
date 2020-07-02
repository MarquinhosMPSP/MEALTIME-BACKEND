const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const ItemController = require('./controllers/ItemController')
const MesaController = require('./controllers/MesaController')

routes
    // Users
    .get('/users', UserController.index)
    .post('/users', UserController.create)
    .put('/users/:id', UserController.update)
    .delete('/users/:id', UserController.delete)
    // Projects
    .get('/projects', ProjectController.index)
    .post('/projects', ProjectController.create)
    // Items
    .get('/item', ItemController.index)
    .get('/mesa', MesaController.index)


module.exports = routes