import '../Customer/Customer.css';
import React, {  useState  } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function FilterCustomer(props) {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');

    const ExecuteFilter = () => {
        props.FilterChanged(name, city);
    }

    return (
        <div className="container-fluid">
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail" className="no-gutter">
                    <Form.Label column md={2}> Nome: </Form.Label>
                    <Col md={10}>
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}> Cidade: </Form.Label>
                    <Col md={10}>
                    <Form.Control type="text" value={city} onChange={e => setCity(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="no-gutter">
                    <Col md={{ span: 10, offset: 2 }}>
                        <Button onClick={ExecuteFilter}>Filtrar</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default FilterCustomer;