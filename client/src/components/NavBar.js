import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom';
import {FiShoppingCart} from 'react-icons/fi' ;

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        history.push(SHOP_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}>Online Store "Devices"</NavLink>
                {user.isAuth && user.user !== true
                    ? <Nav className="ms-auto" style={{color: 'white'}}>
                        <div style={{padding: "5px 25px 0 0", fontSize: "20px"}}>{user.user}</div>
                        
                        <Button 
                            variant={"outline-light"}
                            className="me-2"
                            onClick = {()=> history.push(BASKET_ROUTE)}
                        >
                            <FiShoppingCart />
                        </Button>

                        {user.role === "ADMIN" &&
                            <Button
                                variant={"outline-light"}
                                className="me-2"
                                onClick={() => history.push(ADMIN_ROUTE)}
                            >
                                Admin
                            </Button>
                        }

                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                        >
                            Exit
                        </Button>
                    </Nav>
                    :
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Authorization</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
