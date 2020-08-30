import React, { useReducer, useContext } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Nav } from 'react-bootstrap';
import Radium from 'radium';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Customer from './Customer';
import Home from "./Home";
import Login from "./Login";
import { GlobalContext } from "./globalContext";
import { useHistory } from "react-router-dom";

function App() {
    const globalContext = useContext(GlobalContext);
    const history = useHistory();
    const LogoutHandler = () => {
        localStorage.removeItem('ReactAppToken');
        globalContext.changeLogedIn(false);
    }
    return (
        <Router>
            <div className="main-container">
                {globalContext.logedIn && <div>
                    <div className="left-container">
                        <Link to="/">
                            <div className="div1">
                                <img src="https://cdn0.iconfinder.com/data/icons/my-house-1/512/01-house-48.png" />
                            </div>
                        </Link>
                        <div className="div2">
                            <Link to="/customer">Cliente</Link>
                            <div className="line" ></div>
                            <Link to="/">Produto</Link>
                            <div className="line" ></div>
                            <Link to="/">Venda</Link>
                        </div>
                    </div>
                </div>
                }
                <div style={{ "flexGrow": "1" }}>
                    <div className="right-container">
                        {globalContext.logedIn && <div className="div1">
                            <div className="container-toolbar">
                                <div className="div1">
                                    <DropdownButton alignRight title="Adm" id="dropdown-menu-align-right">
                                        <Dropdown.Item eventKey="1">Configurações</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="4" onClick={() => LogoutHandler()}>Sair</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                                <div className="div2">
                                    {globalContext.title}
                                </div>
                            </div>
                        </div>
                        }
                        <div className="div2">
                            <Switch>
                                <Route exact path="/login"><Login /></Route>
                                <Route exact path="/" render={() => { return (globalContext.logedIn ? <Home /> : <Redirect to="/login" />) }} />
                                <Route exact path="/customer" render={() => { return (globalContext.logedIn ? <Customer /> : <Redirect to="/login" />) }} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default Radium(App);