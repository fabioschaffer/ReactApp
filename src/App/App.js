import '../App/App.css';
import React, { useContext } from 'react';
import { GlobalContext } from "../globalContext";
import { BrowserRouter  } from 'react-router-dom';
import Menu from '../App/Menu';
import Toolbar from '../App/Toolbar';
import Router from './Router';

function App() {
    const globalContext = useContext(GlobalContext);
    return (
        <BrowserRouter>
            <div className="app-container">
                {globalContext.logedIn && <Menu />}
                <div className="divContent">
                    <div className="content-container">
                        {globalContext.logedIn && <Toolbar />}
                        <Router />
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;