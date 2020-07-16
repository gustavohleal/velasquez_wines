const requests = require('../Utils/requests');
const { removeSpecialCharacter } = require('../Utils/helper');
const ShoppingService = require('../services/ShoppingService');
const { getClientById } = require('../services/ClientService');

module.exports = {
    async index(req, res){
        const buys = await requests.listBuys();
        return res.json(buys)
    },

    async getClientShoppings(req, res){
        const { id } = req.params;

        const client = await getClientById(Number(id));


        const shoppingList = await requests.listBuys();
        
        client.cpf = removeSpecialCharacter(client.cpf);

        const clientShoppings = ShoppingService.getClientShoppingList(client, shoppingList);
        
        //console.log(clientShoppings);
        return res.json(clientShoppings);
    }
}