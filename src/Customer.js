import React, { useContext, useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { GlobalContext } from './globalContext';
import { Table } from "react-bootstrap";
import './Customer.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import $ from 'jquery';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

export default function Customer() {
    const globalContext = useContext(GlobalContext);
    useEffect(() => {
        globalContext.changeTitle('Cliente');
    });
    const [showFilter, setShowFilter] = useState(false);
    const [showList, setShowList] = useState(true);
    const [custId, setCustId] = useState(0);

    const ShowFilterHandler = () => {
        if (showFilter) $("#divFilter").hide(); else $("#divFilter").show();
        setShowFilter(!showFilter);
    }

    const ListHandler = () => {
        setCustId(0);
        setShowList(true);
    }

    const NewHandler = () => {
        setCustId(0);
        setShowList(false);
    }

    const EditHandler = (id) => {
        setCustId(id);
        setShowList(false);
    }

    return (
        <div id="container">
            <div id="divToolbar">
                { //Icons Toolset: https://www.iconfinder.com/iconsets/essentials-9 
                }
                <div className="divAction" title="Listagem" onClick={ListHandler}>
                    <img src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Menu-32.png" />
                </div>
                <div className="divAction" title="Novo" onClick={NewHandler}>
                    <img src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Plus-32.png" />
                </div>
                {
                    //ao passar o mouse sobre o Pesquisar, exibir os fitros, utilizando 
                    //https://react-bootstrap.github.io/components/overlays/#popover-examples
                }
                <div className="divAction" title="Pesquisar" onClick={ShowFilterHandler}>
                    {
                        //Talvez modificar a imagem para ícone de filtro, e modificar tooltip para 'Filtrar'.
                    }
                    <img src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Search-32.png" />
                </div>
            </div>
            {showFilter && <div id="divFilter">
                <CustomerFilter></CustomerFilter>
            </div>
            }
            <div id="divContent">
                {showList && <TableCustomer onChange={EditHandler} />}
                {!showList && <FormCustomer custId={custId} />}
            </div>
        </div>
    )
}

function TableCustomer(props) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:62332/values').then(resp => {
            const items = [];
            resp.data.map((i, idx) => {
                items.push({
                    id: i.id,
                    name: i.name
                });
            });
            setList(items);
            setLoading(false);
        });
    }, []);

    const DeleteHandler = (id) => {
        let r = window.confirm("Confirma exclusão?" + id);
        if (r == true) {
            //modificar o ícone para loading.
            //exlcuir no server.
            axios.delete('http://localhost:62332/values/' + id);
            let row = $("#tableCust tbody tr[key2='" + id + "']");
            row.remove();
        }
    }


    const TableRows = list.map(i => {
        return <tr key={i.id} key2={i.id}>
            <td>{i.name}</td>
            <td style={{ width: '60px' }}>
                <i className="material-icons MouseHover" onClick={() => props.onChange(i.id)}>edit</i>
                <i className="material-icons MouseHover" onClick={() => DeleteHandler(i.id)}>delete</i>
            </td>
        </tr>;
    });
    return (
        <div className="w-100">
            {loading && <p className="text-center">Carregando...</p>}
            {!loading &&
                <Table id="tableCust" striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TableRows}
                    </tbody>
                </Table>
            }
        </div>
    )
}

function FormCustomer(props) {
    const [name, setName] = useState('');

    const SaveHandler = () => {
        //alert(name);
        if (props.custId == 0) {
            const response = axios.post('http://localhost:62332/values', { Name: name });
        } else {
            const response = axios.put('http://localhost:62332/values/' + props.custId, { name: name });
        }

    }

    useEffect(() => {
        if (props.custId != 0) {
            axios.get('http://localhost:62332/values/' + props.custId).then(resp => {
                setName(resp.data.name);
            });
        }
    },[]);

    return (
        <div className="container-fluid">
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail" className="no-gutter">
                    <Form.Label column md={2}> Nome: </Form.Label>
                    <Col md={10}>
                        <Form.Control type="text"   value={name} onChange={e => setName(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>
                        CPF:
    </Form.Label>
                    <Col md={10}>
                        <Form.Control />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>
                        Telefone:
    </Form.Label>
                    <Col md={10}>
                        <Form.Control />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>
                        Endereço:
    </Form.Label>
                    <Col md={10}>
                        <Form.Control />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>
                        Cidade:
    </Form.Label>
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

function CustomerFilter() {
    return (
        <div className="container-fluid">
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail" className="no-gutter">
                    <Form.Label column md={2}>
                        Nome:
    </Form.Label>
                    <Col md={10}>
                        <Form.Control type="email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>
                        CPF:
    </Form.Label>
                    <Col md={10}>
                        <Form.Control />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>
                        Telefone:
    </Form.Label>
                    <Col md={10}>
                        <Form.Control />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>
                        Endereço:
    </Form.Label>
                    <Col md={10}>
                        <Form.Control />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword" className="no-gutter">
                    <Form.Label column md={2}>
                        Cidade:
    </Form.Label>
                    <Col md={10}>
                        <Form.Control />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="no-gutter">
                    <Col md={{ span: 10, offset: 2 }}>
                        <Button type="submit">Filtrar</Button>
                    </Col>
                </Form.Group>
            </Form>


        </div>
    )
}