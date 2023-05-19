import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')

    const click = async () => {
        let data;
        try {
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(first_name, last_name, email, password);
            }
            user.setUser(data.first_name + " " + data.last_name)
            user.setIsAuth(true)
            user.setRole(data.role)
            user.setUserId(data.id)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
   
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Authorization' : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    {isLogin 
                        ? ""
                        : <>
                            <Form.Control
                                className="mt-3"
                                placeholder="Enter your first name..."
                                value={first_name}
                                onChange={e => setFirst_name(e.target.value)}
                            />

                            <Form.Control
                                className="mt-3"
                                placeholder="Enter your last name..."
                                value={last_name}
                                onChange={e => setLast_name(e.target.value)}
                            />
                        </>
                    } 
                     
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />

                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                I do not have an account? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
                            </div>
                            :
                            <div>
                                I have an account? <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Sign in' : 'Registration'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
