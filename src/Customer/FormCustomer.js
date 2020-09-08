import '../Customer/Customer.css';
import React, { useEffect, useState  } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

function FormCustomer(props) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (props.custId !== 0) {
            axios.get('http://localhost:62332/values/' + props.custId,
                { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ReactAppToken') } }
            ).then(resp => {
                setName(resp.data.name);
            });
        }
    }, []);

    const SaveHandler = () => {
        if (props.custId === 0) {
            axios.post('http://localhost:62332/values',
                { Name: name },
                { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ReactAppToken') } });
        } else {
            axios.put('http://localhost:62332/values/' + props.custId,
                { name: name },
                { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ReactAppToken') } });
        }
    }

    return (
        <div className="container-fluid">
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail" className="no-gutter">
                    <Form.Label column md={2}>Nome:</Form.Label>
                    <Col md={10}>
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>CPF:</Form.Label>
                    <Col md={10}>
                        <Form.Control />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>Telefone:</Form.Label>
                    <Col md={10}>
                        <Form.Control />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>Endereço:</Form.Label>
                    <Col md={10}>
                        <Form.Control />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>Cidade:</Form.Label>
                    <Col md={10}>
                        <Form.Control />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="no-gutter">
                    <Col md={{ span: 10, offset: 2 }}>
                        <Button onClick={SaveHandler}>Salvar</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default FormCustomer;