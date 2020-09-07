import '../Customer/Customer.css';
import React, { useEffect, useState } from 'react';
import { Table } from "react-bootstrap";
import $ from 'jquery';
import axios from "axios";

function TableCustomer(props) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:62332/values?name=' + props.NameFilter + '&city=' + props.CityFilter,
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
        if (r === true) {
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

export default TableCustomer;