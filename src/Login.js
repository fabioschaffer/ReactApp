import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { GlobalContext } from './globalContext';
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
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <i className="material-icons" style={{ fontSize: '60px' }}>login</i>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <h2>Entrar</h2>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="texxt" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Senha" value={pwd} onChange={e => setPwd(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Button variant="primary" className="w-25" onClick={() => LoginHandler()}>Entrar</Button>
                </Form.Group>
            </Form>
        </div>



    )
}