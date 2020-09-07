import '../App/Menu.css';
import React from 'react';
import {  Link } from 'react-router-dom';

function Menu() {
    return (
        <div className="divMenu">
            <div className="menu-container">
                <Link to="/">
                    <div className="divLogo">
                        <img src="https://cdn0.iconfinder.com/data/icons/my-house-1/512/01-house-48.png" />
                    </div>
                </Link>
                <div className="divMenu">
                    <Link to="/customer">Cliente</Link>
                    <div className="line" ></div>
                    <Link to="/product">Produto</Link>
                    <div className="line" ></div>
                    <Link to="/">Venda</Link>
                </div>
            </div>
        </div>
    );
}

export default Menu;