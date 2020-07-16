const express = require('express');

const ClientController = require('./controllers/ClientController');
const PurchasesController = require('./controllers/PurchasesController');
const routes = express.Router();


routes.get('/clients', ClientController.index);

routes.get('/clients/:id', ClientController.getClient);

routes.get('/clients/OrderedByPurchase', PurchasesController.getOrderedClientsByHigherValue);

routes.get('/purchases', PurchasesController.index);

routes.get('/purchases/:id', PurchasesController.getClientPurchases);

routes.get('/purchases/higherYear/:year', PurchasesController.getHigherPurchaseYear);

module.exports = routes;