import React, {useEffect, useState, useContext} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {SHOP_ROUTE, BASKET_ROUTE} from "../utils/consts";
import bigStar from '../assets/bigStar.png';
import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {fetchOneDevice, updateRating} from "../http/deviceAPI";
import {createBasket, getAll} from '../http/basketAPI';
import {updateRate, fetchRates, createRate} from '../http/ratingAPI';
import {FaStar} from 'react-icons/fa';
import {Context} from "../index";

const DevicePage = () => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [device, setDevice] = useState({info: []})
    const [itemsInBasket, setItemsInBasket] = useState([])
    const [rates, setRates] = useState([])
    const [rate, setRate] = useState([{rate: 0}]);
    const [rating, setRating] = useState(0)
    const [averageRate, setAverageRate] = useState(0)
    const [hover, setHover] = useState(null)
    const [clickStar, setClickStar] = useState(false)
    const [totalRate, setTotalRate] = useState([])
    const [counter, setCounter] = useState(1);
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [id]);

    useEffect(() => {
        getAll().then(data => setItemsInBasket(data));
    }, [itemsInBasket]);

    useEffect(() => {
        if (rate.length !== 0 && user.userId !== 0) {
            setRating(rate[0].rate)
        }
    }, [rate, user.userId]);

    useEffect(() => {
        if (clickStar && user.userId !== 0) {
            updateRate(rating, user.userId, device.id)
            setClickStar(false)
        }

        setRate(rates.filter((rate) => {return user.userId === rate.userId && device.id === rate.deviceId}));
        
        if (rate.length === 0 && clickStar) {
            createRate(rating, user.userId, device.id)
            setClickStar(false)
        }
    },[clickStar, rating, user.userId, device.id, rates, rate.length]);

    useEffect(() => {
        fetchRates().then(data => setRates(data));
    }, [rates]);

    useEffect(() => {
        let totalRates = rates.filter((rate) => {return rate.deviceId === device.id})
        let total = 0
        for (let i = 0; i < totalRates.length; i++) {
            total += totalRates[i].rate
        }
        setTotalRate(total)

        if (!isNaN((totalRate/totalRates.length).toFixed(0))) {
            setCounter((totalRate/totalRates.length).toFixed(0));
        } else {setCounter(1)}

        if (device.id !== undefined && !isNaN((totalRate/totalRates.length).toFixed(0))) {
            updateRating(device.id, counter)
            setAverageRate(counter)
        }
    }, [rates, device.id, totalRate, counter, device.rating]);

    const clickAddDevice = () => {
        if (user.userId === 0) {
            history.push(SHOP_ROUTE);
        } else {
            var maxId = itemsInBasket.reduce((a,b) => {
                return new Date(a.createdAt) > new Date(b.createdAt) ? a : b
            },{});

            if (Object.keys(maxId).length === 0) {maxId.id = 0}

            createBasket(maxId.id + 1, user.userId, id);
            history.push(BASKET_ROUTE);
        }
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
                            {averageRate}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>from: ${device.price}</h3>

                        <div>
                            {[...Array(5)].map((star, index) => {
                                const currentRating = index + 1
                                return (
                                    <label key={index}>
                                        <input
                                            style={{display: 'none'}}
                                            type='radio'
                                            name='rating'
                                            value={currentRating}
                                            onClick={() => {
                                                if (user.userId !== 0) {
                                                    setClickStar(true)
                                                    setRating(currentRating)
                                                }
                                            }}
                                        />
                                        <FaStar
                                            style={{cursor: 'pointer'}}
                                            size={40}
                                            color={currentRating <= (hover || rating) ? "#ffc107" : "e4e5e9"}
                                            onMouseEnter={() => setHover(user.userId !==0 ? currentRating : null)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                ) 
                            })}
                        </div>        
                        
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
