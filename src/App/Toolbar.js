import '../App/Toolbar.css';
import React, { useContext } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { GlobalContext } from "../Utility/GlobalContext";

function Toolbar() {
    const globalContext = useContext(GlobalContext);
    const LogoutHandler = () => {
        localStorage.removeItem('ReactAppToken');
        globalContext.changeLogedIn(false);
    }
    return (
        <div className="divToolbar">
            <div className="container-toolbar">
                <div className="divConfigs">
                    <DropdownButton alignRight title="Adm" id="dropdown-menu-align-right">
                        <Dropdown.Item eventKey="1">Configurações</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4" onClick={() => LogoutHandler()}>Sair</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="divTitle">
                    {globalContext.title}
                </div>
            </div>
        </div>
    );
}

export default Toolbar;