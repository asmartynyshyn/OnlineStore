import React, {useEffect, useState, useContext} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {BASKET_ROUTE} from "../utils/consts";
import bigStar from '../assets/bigStar.png';
import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {fetchOneDevice} from "../http/deviceAPI";
import { createBasket, getAll } from '../http/basketAPI';
import {Context} from "../index";

const DevicePage = () => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [device, setDevice] = useState({info: []})
    const [itemsInBasket, setItemsInBasket] = useState([])
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [id]);

    useEffect(() => {
        getAll().then(data => setItemsInBasket(data));
    }, [itemsInBasket]);

    const clickAddDevice = () => {
        var maxId = itemsInBasket.reduce((a,b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? a : b
        },{});

        if (Object.keys(maxId).length === 0) {maxId.id = 0}

        createBasket(maxId.id + 1, user.userId, id);
        history.push(BASKET_ROUTE);
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>from: ${device.price}</h3>
                        <Button 
                            variant={"outline-dark"}
                            onClick = {clickAddDevice}
                        >
                            Add to Basket
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Characteristics</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
