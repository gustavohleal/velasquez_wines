const requests = require('../Utils/requests');
const { removeSpecialCharacter } = require('../Utils/helper');
const PurchasesService = require('../services/PurchasesService');
const { getClientById, getClientByCpf } = require('../services/ClientService');

module.exports = {
    async index ( req, res ) {

        const purchasesHist = await requests.purchasesHist();

        if ( purchasesHist.isAxiosError ){
            return res.status ( purchasesHist.response.status ).send ( 'Error getting purchase hist' );
        }

        return res.status(200).json ( purchasesHist );

    },

    async getClientPurchases ( req, res ) {
        const { id } = req.params;

        const clientList = await requests.listClients ();

        const purchasesHist = await requests.purchasesHist ();

        if ( purchasesHist.isAxiosError ){
            return res.status ( purchasesHist.response.status ).send ( 'Error getting purchase hist' );
        }
        if ( clientList.isAxiosError ){
            return res.status ( clientList.response.status ).send ( 'Error getting client list' );
        }

        const client = getClientById ( Number ( id ), clientList );

        
        const clientPurchases = PurchasesService.getClientPurchasesHist ( client, purchasesHist );
        return res.status(200).json ( clientPurchases );
    },

    async getOrderedClientsByHigherValue ( req, res ) {

        const purchasesHist = await requests.purchasesHist ();

        const clientList = await requests.listClients ();
        
        if ( purchasesHist.isAxiosError ){
            return res.status ( purchasesHist.response.status ).send ( 'Error getting purchase hist' );
        }
        if ( clientList.isAxiosError ){
            return res.status ( clientList.response.status ).send ( 'Error getting client list' );
        }

        const orderedClients = PurchasesService.orderClient ( clientList, purchasesHist );

        return res.status(200).json ( orderedClients );
    },

    async getHigherPurchaseYear ( req, res ) {

        const { year } = req.params;
        const purchasesHist = await requests.purchasesHist ();

        const clientList = await requests.listClients ();

        if ( purchasesHist.isAxiosError ){
            return res.status ( purchasesHist.response.status ).send ( 'Error getting purchase hist' );
        }
        if ( clientList.isAxiosError ){
            return res.status ( clientList.response.status ).send ( 'Error getting client list' );
        }
        return res.status(200).json ( PurchasesService.higherPurchaseYear ( year, purchasesHist, clientList ) );

    },

    async getMostFaithfulClients ( req, res ) {
        const purchasesHist = await requests.purchasesHist ();
        const clientList = await requests.listClients ();

        if ( purchasesHist.isAxiosError ){
            return res.status ( purchasesHist.response.status ).send ( 'Error getting purchase hist' );
        }
        if ( clientList.isAxiosError ){
            return res.status ( clientList.response.status ).send ( 'Error getting client list' );
        }

        return res.status(200).json ( PurchasesService.getMostFaithfulClients ( clientList, purchasesHist ) );
    },

    async getWineRecomendation ( req, res ) {

        const { id } = req.params;

        const purchasesHist = await requests.purchasesHist ();

        const clientList = await requests.listClients ();

        if ( purchasesHist.isAxiosError ){
            return res.status ( purchasesHist.response.status ).send('Error getting purchase hist' );
        }
        if(clientList.isAxiosError){
            return res.status ( clientList.response.status ).send('Error getting client list' );
        }
        const client = getClientById(id, clientList);

        return res.status(200).json ( PurchasesService.wineRecomendation ( client, purchasesHist ))


    },

    
}