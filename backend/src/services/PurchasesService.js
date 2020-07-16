const { removeSpecialCharacter, fixCpfStr } = require('../Utils/helper');
const { getClientByCpf } = require('./ClientService');


    function trimCliente ( purchaseHist ) {

        const cpf = fixCpfStr ( cliente );
        return removeSpecialCharacter ( cpf );
    }

    function getClientPurchasesHist(client, purchasesHist){
        const clientShoppings = purchasesHist.map ( ( item ) => {
            const cpfCliente = item.cliente;

            if ( cpfCliente === client.cpf ) {
                return item;
            }
        }).filter(item => { 
            return item != null;
        });

        return clientShoppings;
    }

    function orderClient ( clientList, purchasesHist ){

        const clientsTotalValue = clientList.map ( ( client ) =>  {

            const clientPurchases = getClientPurchasesHist ( client, purchasesHist );

            const totalValue = clientPurchases.reduce ( ( p, v ) => {
               return { 
                   valorTotal: p.valorTotal + v.valorTotal 
                };
            }, { valorTotal: 0 } );
            
            return {
                client, 
                valorTotal : totalValue.valorTotal 
            };
        });

       return clientsTotalValue.sort ( ( a, b ) => 
            {
                return b.valorTotal - a.valorTotal;
            });
    }

    function higherPurchaseYear ( year, purchasesHist, clientList ){

        const purchasesYear = purchasesHist.map ( ( purchase ) => {
            const data = purchase.data.split('-');
            if ( data[2] === year) {
                return purchase;
            }
        }).filter(purchase => { 
            return purchase != null 
        });

        const higherPurchase = purchasesYear.reduce ( (prev, current) => {
            return ( prev.valorTotal > current.valorTotal ) ? prev : current;
        });

        const clientCpf = higherPurchase.cliente;

        const client = getClientByCpf ( clientCpf, clientList );
        
        return { 
            client, 
            higherPurchase
        };

    }

module.exports = {
    trimCliente,
    getClientPurchasesHist,
    orderClient,
    higherPurchaseYear,
}

