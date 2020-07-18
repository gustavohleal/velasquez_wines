import React, {useEffect, useState} from 'react';
import {  Container, 
        Row, 
        Col, 
        Modal, 
        Button } from 'react-bootstrap';

import { FaWineBottle } from 'react-icons/fa';

import HighestPurchase from '../../components/HighestPurchase';

import api from '../../services/api';

import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'



export default function Purchases(){
    const [usersByPurchaseValue, setUsersByPurchaseValue] = useState([]);
    const [usersByFidelity, setUsersByFidelity] = useState([]);
    const [year, setYear] = useState([]);
    const [nomePurchase, setNomePurchase] = useState([]);
    const [dataPurchase, setDataPurchase] = useState([]);
    const [valorTotalPurchase, setValorTotalPurchase] = useState([]);
    const [status, setStatus] = useState();
    const [yearFinal, setYearFinal] = useState([]);

    const [toggle, setToggle] = useState(false);

    const [idForRec, setIdForRec] = useState();

    const [wineRec, setWineRec] = useState([]);
    


    useEffect ( ()=>{
        api.get('/clients/OrderedByPurchase')
            .then(response =>{
                setUsersByPurchaseValue(response.data.flat());
        })
    }, [] );

    useEffect ( ()=>{
        api.get('/purchases/fidelity')
            .then(response =>{
                setUsersByFidelity(response.data);
        })
    }, [] );


    useEffect ( () => {
        api.get(`/purchases/wineRecomendation/${ idForRec }`)
        .then (response => {
            
            setWineRec( response.data.item);
            setToggle(true);
        });
    }, [idForRec] )


    useEffect ( () => {

        api.get ( `/purchases/higherYear/${ yearFinal }` )
            .then ( response => {
                setStatus ( true );
                setNomePurchase ( response.data.client.nome );
                setValorTotalPurchase ( response.data.higherPurchase.valorTotal );
                setDataPurchase ( response.data.higherPurchase.data );

        });
        
    }, [yearFinal] );

    function handleWineRecomendation ( id ) {
        setIdForRec ( id );
    }

    function handleClose (){
        setToggle(false);
    }
    
    function handleBiggestPurchaseYear ( e ){
        e.preventDefault ();
        setYearFinal ( year );
    }
    return (
        
        <Container className="purchases-container" fluid>


        <Modal show={ toggle } onHide={ handleClose }>
            <Modal.Header closeButton>
            <Modal.Title>Recomendação de vinho</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <strong>Produto</strong>
                <p>{ wineRec.produto }</p>
                <strong>Variedade:</strong>
                <p>{ wineRec.variedade }</p>
                <strong>País:</strong>
                <p>{ wineRec.pais }</p>
                <strong>Categoria:</strong>
                <p>{ wineRec.categoria }</p>
                <strong>Safra:</strong>
                <p>{ wineRec.safra }</p>
                <strong>Preço:</strong>
                <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(wineRec.preco) }</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick= { handleClose }>
                Close
            </Button>

            </Modal.Footer>
        </Modal>
            
            <header>
                <span>Bem vindo, Velazques</span>
             </header>

             <Row >
                <Col  sm={12} md={4} lg={4}>
                    <span>Clientes</span>

                    <Row className="client-container">

                        <ul>
                            { usersByPurchaseValue.map ( user => (
                                <li key={ user.client.id }> 
                                    <strong>Nome:</strong>
                                    <p>{ user.client.nome }</p>
                                    <strong>Total em compras:</strong>
                                    <p>{ Intl.NumberFormat( 'pt-BR', { style: 'currency', currency: 'BRL' } ).format ( user.valorTotal ) }</p>
                                    <button type="button" onClick={ () => handleWineRecomendation ( user.client.id ) }>
                                        <FaWineBottle size={ 20 } color="a8a8b3"/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        
                    </Row>
                </Col>
                <Col sm={12} md={4} lg={4}>
                    <span>Fidelidade</span>
                    <Row className="client-container">
                        
                        <ul>
                        { usersByFidelity.map ( user => (
                                <li key={ user.client.id }> 
                                    <strong>Nome:</strong>
                                    <p>{ user.client.nome }</p>
                                    <strong>Total em compras:</strong>
                                    <p>{ user.totalPurchases }</p>
                                </li>
                            ))}
                        </ul>
                        
                    </Row>
                    
                </Col>
                <Col sm={12} md={4} lg={4}>
                    <Row>
                        <form onSubmit= { handleBiggestPurchaseYear }>

                            <label>Maior compra no ano:</label>
                            <div className="inputGroup">
                                <input type="number" 
                                        className="yearInput" 
                                        placeholder="Ano"
                                        min="2014"
                                        max="2016"
                                        onChange={ e => {
                                            setYear ( e.target.value )
                                        }}      
                                />
                                <input type="submit" className="submitButton"value="Enviar"/>
                            </div>
                        </form>
                    </Row>
                    <Row>
                        <HighestPurchase nome={ nomePurchase } data= { dataPurchase } valorTotal={ valorTotalPurchase } show={ status }/>
                                            
                    </Row>

                </Col>
             </Row>
    
        </Container>

    )
}