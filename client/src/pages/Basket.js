import React, {useState, useEffect, useContext} from 'react';
import {Col, Row, Container, Badge, Image, Button} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { getAll } from '../http/basketAPI';
// import {useHistory} from 'react-router-dom';
import {Context} from "../index";

const Basket = () => {

    const {user} = useContext(Context)
    // // const history = useHistory()
    const [itemsInBasket, setItemsInBasket] = useState([]);
    let total = 0;

    useEffect(() => {
        getAll().then(data => setItemsInBasket(data));
    }, [itemsInBasket]);

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
                                    <Button size='sm'>Remove</Button>
                                </div>
                                
                                <Badge bg="primary" pill style={{fontSize: "18px"}}>
                                    ${childRow.device.price}
                                </Badge>
                                <p hidden>{total += childRow.device.price}</p>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                <hr style={{height: "1", opacity: "1", display: "flex", justifyContent: "end"}}/>

<Col>
                <Row style={{display: "flex", justifyContent: "end"}}>
                    Sub Total: ${total}
                </Row>

                <Row style={{display: "flex", justifyContent: "end"}}>
                    Tax: ${total * 0.0875}
                </Row>

                <Row style={styledTotals}>
                    Total: ${total + total * 0.0875}
                </Row>
                </Col>
            </Col>
        </Container>
    );
};

export default Basket;
