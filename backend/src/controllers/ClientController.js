const requests = require('../Utils/requests');
const ClientService = require('../services/ClientService');


module.exports = {
    async index(req, res){
        const clients = await requests.listClients();
        return res.json(clients)
    },

    async getClient(req, res){
        const { id } = req.params;

        const client = await ClientService.getClientById(Number(id))

        console.log(client);

        return res.json(client);
    },

    async getOrderedClients ( req, res ) {
        const shoppingList = await requests.listBuys();
        const clientList = await requests.listClients();
        
        const orderedClients = ClientService.orderClient(clientList, shoppingList);
        //console.log(orderedClients)
        return res.json(orderedClients);
    }
}