const { getClientByCpf } = require('./ClientService');

    function getClientPurchasesHist(client, purchasesHist){

        const clientShoppings = purchasesHist.filter ( ( purchase ) => {
           
             return purchase.cliente === client.cpf
            
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

       return clientsTotalValue.sort ( ( a, b ) => {
                return b.valorTotal - a.valorTotal;
            });
    }

    function higherPurchaseYear ( year, purchasesHist, clientList ){

        const purchasesYear = purchasesHist.filter ( ( purchase ) => {
            
            const data = purchase.data.split('-');

            return data[2] === year;
        })

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

    function getMostFaithfulClients( clientList, purchasesHist) {
        const purchasesPerClient = clientList.map ( ( client ) =>  {

            const clientPurchases = getClientPurchasesHist ( client, purchasesHist );

            return {
                client, 
                totalPurchases: clientPurchases.length
            };
        });

        return purchasesPerClient.sort ( (prev, current ) => {
            return current.totalPurchases - prev.totalPurchases;
        });
    }

    function wineRecomendation ( client, purchasesHist ) { 

        const clientHistory = getClientPurchasesHist ( client, purchasesHist );

        const itensBought = clientHistory.map ( (purchase) => {
            return purchase.itens;
        }).flat();
        

        
        var countPurchases= itensBought.reduce(function( object , item ){  

            if ( !object[item.produto+'-'+item.variedade] ) {
               object[item.produto+'-'+item.variedade]= {count: 1, item};
            } else {
               object[item.produto+'-'+item.variedade].count++;
            }
            return object; 
          },{});  

        countPurchases = Object.values(countPurchases).sort((prev, current ) => {
                 return current.count - prev.count;
             });
          
        

        return countPurchases[Math.floor(Math.random() * 3)];

    }

module.exports = {
    getClientPurchasesHist,
    orderClient,
    higherPurchaseYear,
    getMostFaithfulClients,
    wineRecomendation
}

