const { listClients } = require('../Utils/requests');
const { removeSpecialCharacter } = require('../Utils/helper');

const { getClientShoppingList } = require('./ShoppingService')
module.exports = {

    async getClientById(id){
        const clients = await listClients();

        const client = clients.find(u => u.id === id);
        return client;
    },

    async getClientByCpf(cpf){
        const clients = await listClients();

        const client = clients.find ( c => removeSpecialCharacter(c.cpf) === cpf );
        return client;
    },

    orderClient(clientList, shoppingList){

        const promises = clientList.map( (client) =>  {
            client.cpf = removeSpecialCharacter(client.cpf);
            const clientShoppings = getClientShoppingList(client, shoppingList);
            const totalValue = clientShoppings.reduce((p, v) => {
               return { valorTotal: p.valorTotal + v.valorTotal }
            }, { valorTotal: 0} )
            
            return {
                client, 
                valorTotal : totalValue.valorTotal 
            }
        })

       return promises.sort((a, b) => 
            {
                return b.valorTotal - a.valorTotal;
            })
    },
}