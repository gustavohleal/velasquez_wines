const { listClients } = require('../Utils/requests');
const { removeSpecialCharacter } = require('../Utils/helper');

module.exports = {

    getClientById ( id, clientList ) {
    
        const client = clientList.find ( u => u.id === id );
        return client;
    },

    getClientByCpf ( cpf, clientList ) {

        const client = clientList.find ( c => c.cpf === cpf );
        return client;

    },

    
}