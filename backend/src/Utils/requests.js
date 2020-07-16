const axios = require('axios').default;
const { fixCpfStr, removeSpecialCharacter } = require('./helper')
function trimCliente ( cliente ) {
        
    const cpf = fixCpfStr ( cliente );
    return removeSpecialCharacter ( cpf );
}

module.exports = {
    async listClients () {
        try{
            const response = await axios.get ( 'http://www.mocky.io/v2/598b16291100004705515ec5' )
            const clientList = response.data.map ( ( client ) => {
                client.cpf = removeSpecialCharacter ( client.cpf );
                return client;
            })
            return clientList;
        } catch ( e ){
            return e;
        }
    },

    async purchasesHist () {
        try{
            const response = await axios.get('http://www.mocky.io/v2/598b16861100004905515ec7')

            const purchaseHist = response.data.map ( ( purchase ) => {
                purchase.cliente = trimCliente ( purchase.cliente );
                return purchase;
            });
            return purchaseHist;
        } catch ( e ){
            return e;
        }
    }
};