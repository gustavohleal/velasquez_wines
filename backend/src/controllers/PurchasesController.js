const requests = require('../Utils/requests');
const { removeSpecialCharacter } = require('../Utils/helper');
const PurchasesService = require('../services/PurchasesService');
const { getClientById, getClientByCpf } = require('../services/ClientService');

module.exports = {
    async index ( req, res ) {
        const buys = await requests.purchasesHist();
        return res.status(200).json(buys)
    },

    async getClientPurchases ( req, res ) {
        const { id } = req.params;

        const clientList = await requests.listClients ();

        const purchasesHist = await requests.purchasesHist ();

        const client = getClientById ( Number ( id ), clientList );

        PurchasesService.wineRecomendation ( client, purchasesHist )
        
        const clientPurchases = PurchasesService.getClientPurchasesHist ( client, purchasesHist );
        return res.status(200).json ( clientPurchases );
    },

    async getOrderedClientsByHigherValue ( req, res ) {

        const purchasesHist = await requests.purchasesHist ();

        const clientList = await requests.listClients ();
        
        const orderedClients = PurchasesService.orderClient ( clientList, purchasesHist );

        return res.status(200).json ( orderedClients );
    },

    async getHigherPurchaseYear ( req, res ) {

        const { year } = req.params;
        const purchasesHist = await requests.purchasesHist ();

        const clientList = await requests.listClients ();

        return res.status(200).json ( PurchasesService.higherPurchaseYear ( year, purchasesHist, clientList ) );

    },

    async getMostFaithfulClients ( req, res ) {
        const purchasesHist = await requests.purchasesHist ();

        const clientList = await requests.listClients ();


        return res.status(200).json( PurchasesService.getMostFaithfulClients ( clientList, purchasesHist ) );
    },

    async getWineRecomendation ( req, res ) {

        const cpf = req.header.authorization;

        const purchasesHist = await requests.purchasesHist ();

        const clientList = await requests.listClients ();

        const client = getClientByCpf(cpf, clientList);

        return res.status(200).json( PurchasesService.wineRecomendation(client, purchasesHist))


    },

    
}