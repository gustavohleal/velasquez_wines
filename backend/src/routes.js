const express = require('express');

const ClientController = require('./controllers/ClientController');
const ShoppingController = require('./controllers/ShoppingController');
const routes = express.Router();


routes.get('/clients', ClientController.index);

routes.get('/clients/:id', ClientController.getClient);

routes.get('/clientsOrdered', ClientController.getOrderedClients);

routes.get('/buys', ShoppingController.index);

routes.get('/buys/:id', ShoppingController.getClientShoppings);

module.exports = routes;