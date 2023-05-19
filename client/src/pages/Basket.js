import React, {useState, useEffect, useContext} from 'react';
import {Col, Row, Container, Badge, Image, Button} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { getAll, deleteRow } from '../http/basketAPI';
import {Context} from "../index";

const Basket = () => {

    const {user} = useContext(Context)
    const [itemsInBasket, setItemsInBasket] = useState([]);
    const [itemInBasket, setItemInBasket] = useState({});
    const [clickRemoveButton, setClickRemoveButton] = useState(false);
    let total = 0;

    useEffect(() => {
        getAll().then(data => setItemsInBasket(data));
    }, [itemsInBasket]);

    useEffect(() => {
        if (clickRemoveButton) {deleteRow(itemInBasket)}
        setClickRemoveButton(false)
    },[clickRemoveButton]);

    const styledTotals = {
        display: "flex",
        justifyContent: "end",
        fontSize: "18px",
        fontWeight: "bold",
    }

    return (
        <Container className="mt-3">
            <Col>
                <h1>Your Order:</h1>
                <ListGroup as="ol" numbered>
                    {itemsInBasket
                        .filter((childRow) => childRow.basketId === user.userId)
                        .map((childRow) => (
                            <ListGroup.Item
                                key={childRow.id}
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <Image
                                    className='ms-4'
                                    width={70} 
                                    height={70} 
                                    src={process.env.REACT_APP_API_URL + childRow.device.img}
                                />
                                <div className="ms-2 me-auto">
                                    <h4>{childRow.device.name} </h4>
                                    <Button 
                                        size='sm'
                                        variant='danger'
                                        onClick={() => {
                                            // console.log(childRow.basketId)
                                            // console.log(childRow.id)
                                            // console.log(childRow)
                                            // delete itemsInBasket.childRow.id
                                            // console.log(childRow.unique_number)
                                            // setNumberOfRow(childRow.unique_number)
                                            // console.log(numberOfRow)
                                            // setItemInBasket({
                                            //     id: childRow.unique_number
                                            // })
                                            // console.log(itemInBasket.id)
                                            // deleteRow(childRow.unique_number)
                                            setItemInBasket({unique_number: childRow.unique_number});
                                            setClickRemoveButton(true);
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                                
                                <Badge bg="primary" pill style={{fontSize: "18px"}}>
                                    ${childRow.device.price.toFixed(2)}
                                </Badge>
                                <p hidden>{total += childRow.device.price}</p>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>

                <hr style={{height: "1", opacity: "1", display: "flex", justifyContent: "end"}}/>

                <Col>
                    <Row style={{display: "flex", justifyContent: "end"}}>
                        Sub Total: ${total.toFixed(2)}
                    </Row>

                    <Row style={{display: "flex", justifyContent: "end"}}>
                        Tax: ${(total * 0.0875).toFixed(2)}
                    </Row>

                    <Row style={styledTotals}>
                        Total: ${(total + total * 0.0875).toFixed(2)}
                    </Row>
                </Col>
            </Col>
        </Container>
    );
};

export default Basket;
