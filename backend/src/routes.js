const express = require('express');

const ClientController = require('./controllers/ClientController');
const PurchasesController = require('./controllers/PurchasesController');
const routes = express.Router();


routes.get('/clients', ClientController.index);

routes.get('/clients/OrderedByPurchase', PurchasesController.getOrderedClientsByHigherValue);

routes.get('/clients/:id', ClientController.getClientById);

routes.get('/purchases', PurchasesController.index);



routes.get('/purchases/higherYear/:year', PurchasesController.getHigherPurchaseYear);

routes.get('/purchases/fidelity', PurchasesController.getMostFaithfulClients);

routes.get('/purchases/wineRecomendation/:id', PurchasesController.getWineRecomendation);

routes.get('/purchases/:id', PurchasesController.getClientPurchases);



module.exports = routes;