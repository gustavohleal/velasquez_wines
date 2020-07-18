import React from 'react';

import './styles.css';

export default function HighestPurchase(props){
    const {nome, data, valorTotal, show} = props;
    if(!show){
        return null
    } else {
        return (                        
        
            <div className="higherPurchase">

                <strong>Nome:</strong>
                <p>{nome}</p>
                <strong>Valor da compra:</strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)}</p>
                <strong>Data:</strong>
                <p>{data}</p>
            </div>
            
        );
    }
}