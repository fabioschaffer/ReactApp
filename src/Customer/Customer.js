import '../Customer/Customer.css';
import React, { useContext, useEffect, useState  } from 'react';
import { GlobalContext } from '../Utility/GlobalContext';
import TableCustomer from "../Customer/TableCustomer";
import FormCustomer from "../Customer/FormCustomer";
import FilterCustomer from "../Customer/FilterCustomer";

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
                    <img src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Menu-32.png" alt="" />
                </div>
                <div className="divAction" title="Novo" onClick={NewHandler}>
                    <img src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Plus-32.png" alt="" />
                </div>
                {
                    //ao passar o mouse sobre o Pesquisar, exibir os fitros, utilizando 
                    //https://react-bootstrap.github.io/components/overlays/#popover-examples
                }
                <div className="divAction" title="Pesquisar" onClick={FilterHandler}>
                    {
                        //Talvez modificar a imagem para ícone de filtro, e modificar tooltip para 'Filtrar'.
                    }
                    <img src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Search-32.png" alt="" />
                </div>
            </div>
            <div id="divContent">
                {showList && <TableCustomer onChange={EditHandler} NameFilter={nameFilter} CityFilter={cityFilter} />}
                {showForm && <FormCustomer custId={custId} />}
                {showFilter && <FilterCustomer FilterChanged={FilterChangedHandler} ></FilterCustomer>}
            </div>
        </div>
    )
}