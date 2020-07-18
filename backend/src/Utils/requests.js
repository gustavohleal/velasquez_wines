const axios = require('axios').default;
const { fixCpfStr, removeSpecialCharacter } = require('./helper')

if ( process.env.NODE_ENV === "dev"){
    require('dotenv').config();
}

function trimCliente ( cliente ) {
        
    const cpf = fixCpfStr ( cliente );
    return removeSpecialCharacter ( cpf );
}

module.exports = {
    async listClients () {
        try{
            const response = await axios.get ( process.env.CLIENT_LIST_URL )
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
            const response = await axios.get ( process.env.PURCHASE_HIST_URL )

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