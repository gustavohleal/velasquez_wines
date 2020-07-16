const axios = require('axios').default;


module.exports = {
    async listClients() {
        try{
            const response = await axios.get('http://www.mocky.io/v2/598b16291100004705515ec5')
            return response.data;
        } catch(e){
            return e;
        }
    },

    async listBuys() {
        try{
            const response = await axios.get('http://www.mocky.io/v2/598b16861100004905515ec7')
            return response.data
        } catch(e){
            return e;
        }
    }
};