const requests = require('../Utils/requests');
const { removeSpecialCharacter } = require('../Utils/helper');
const PurchasesService = require('../services/PurchasesService');
const { getClientById } = require('../services/ClientService');

module.exports = {
    async index ( req, res ) {
        const buys = await requests.purchasesHist();
        return res.json(buys)
    },

    async getClientPurchases ( req, res ) {
        const { id } = req.params;

        const clientList = await requests.listClients ();

        const purchasesList = await requests.purchasesHist ();

        const client = getClientById ( Number ( id ), clientList );
        
        const clientPurchases = PurchasesService.getClientPurchasesHist ( client, purchasesList );

        
        return res.json ( clientPurchases );
    },

    async getOrderedClientsByHigherValue ( req, res ) {

        const purchasesList = await requests.purchasesHist ();

        const clientList = await requests.listClients ();
        
        const orderedClients = PurchasesService.orderClient ( clientList, purchasesList );

        return res.json ( orderedClients );
    },

    async getHigherPurchaseYear ( req, res ) {

        const { year } = req.params;
        const purchasesList = await requests.purchasesHist ();

        const clientList = await requests.listClients ();

        return res.json ( PurchasesService.higherPurchaseYear ( year, purchasesList, clientList ) );

    }
}