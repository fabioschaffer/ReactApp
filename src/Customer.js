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
    const [showList, setShowList] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [custId, setCustId] = useState(0);
    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');

    const ListHandler = () => {
        setCustId(0);
        setShowList(true);
        setShowForm(false);
        setShowFilter(false);
    }

    const NewHandler = () => {
        setCustId(0);
        setShowList(false);
        setShowForm(true);
        setShowFilter(false);
    }

    const EditHandler = (id) => {
        setCustId(id);
        setShowList(false);
        setShowForm(true);
        setShowFilter(false);
    }

    const FilterHandler = () => {
        setShowList(false);
        setShowForm(false);
        setShowFilter(true);
    }

    const FilterChangedHandler = (name, city) => {
        setNameFilter(name);
        setCityFilter(city);
        ListHandler();
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
                <div className="divAction" title="Pesquisar" onClick={FilterHandler}>
                    {
                        //Talvez modificar a imagem para ícone de filtro, e modificar tooltip para 'Filtrar'.
                    }
                    <img src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Search-32.png" />
                </div>
            </div>
            <div id="divContent">
                {showList && <TableCustomer onChange={EditHandler} NameFilter={nameFilter} CityFilter={cityFilter} />}
                {showForm && <FormCustomer custId={custId} />}
                {showFilter && <CustomerFilter FilterChanged={FilterChangedHandler} ></CustomerFilter>}
            </div>
        </div>
    )
}

function TableCustomer(props) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:62332/values',
            {
                params: {
                    name: props.NameFilter,
                    city: props.CityFilter
                }
            },
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ReactAppToken') } }
        ).then(resp => {
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
            axios.delete('http://localhost:62332/values/' + id,
                { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ReactAppToken') } }
            );
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
        if (props.custId == 0) {
            const response = axios.post('http://localhost:62332/values',
                { Name: name },
                { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ReactAppToken') } });
        } else {
            const response = axios.put('http://localhost:62332/values/' + props.custId,
                { name: name },
                { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ReactAppToken') } });
        }
    }

    useEffect(() => {
        if (props.custId != 0) {
            axios.get('http://localhost:62332/values/' + props.custId,
                { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ReactAppToken') } }
            ).then(resp => {
                setName(resp.data.name);
            });
        }
    }, []);

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

function CustomerFilter(props) {
    const [name, setName] = useState('');

    const ExecuteFilter = () => {
        props.FilterChanged(name);
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
                        <Form.Control />
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