const { removeSpecialCharacter, fixCpfStr } = require('../Utils/helper');
    function trimCliente ( cliente ) {
        const cpf = fixCpfStr ( cliente );
        return removeSpecialCharacter ( cpf );
    }

    function getClientShoppingList(client, shoppingList){
        const clientShoppings = shoppingList.map((item) => {
            const cpfCliente = trimCliente(item.cliente);
            if(cpfCliente === client.cpf){
                return item
            }
        }).filter(item => {return item != null});
        return clientShoppings;
    }

module.exports = {
    trimCliente,
    getClientShoppingList,
}

