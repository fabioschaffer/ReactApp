import '../App/Login.css';
import React, { useState, useContext, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { GlobalContext } from '../globalContext';
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login(props) {
    const globalContext = useContext(GlobalContext);
    const history = useHistory();
    const [login, setLogin] = useState('');
    const [pwd, setPwd] = useState('');

    const LoginHandler = () => {
        const response = axios.post('http://localhost:62332/user/login', { Login: login }).then(resp => {
            if (resp.status == 200) {
                localStorage.setItem('ReactAppToken', resp.data.token);
                globalContext.changeLogedIn(true);
                history.push("/");
            } else {
                alert('Credenciais inválidas.')
            }
        });
    }

    return (
        <div id="divLogin">
            <div id="divLogin2">
                <div className="container-fluid">
                    <div id="divLogin3">
                        <Form.Group controlId="formBasicEmail">
                            <i className="material-icons" style={{ fontSize: '60px' }}>login</i>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <h2>Entrar</h2>
                        </Form.Group>
                    </div>
                    <Form>
                        <Form.Group as={Row} controlId="formHorizontalEmail" >
                            <Form.Label column md={2}> Login: </Form.Label>
                            <Col md={10}>
                                <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalPassword" >
                            <Form.Label column md={2}>Senha:</Form.Label>
                            <Col md={10}>
                                <Form.Control type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
                            </Col>
                        </Form.Group>
                    </Form>
                    <div id="divLogin4">
                        <Button onClick={() => LoginHandler()}>Entrar</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}