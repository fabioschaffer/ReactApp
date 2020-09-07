import '../App/Router.css';
import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { GlobalContext } from "../globalContext";
import Customer from '../Customer';
import Product from "../Product";
import Login from "./Login";

function Router() {
    const globalContext = useContext(GlobalContext);
    return (
        <div id="divRouter">
            <Switch>
                <Route exact path="/login"><Login /></Route>
                <Route exact path="/" render={() => { return (globalContext.logedIn ? <Redirect to="/customer" /> : <Redirect to="/login" />) }} />
                <Route exact path="/customer" render={() => { return (globalContext.logedIn ? <Customer /> : <Redirect to="/login" />) }} />
                <Route exact path="/product" render={() => { return (globalContext.logedIn ? <Product /> : <Redirect to="/login" />) }} />
            </Switch>
        </div>
    );
}

export default Router;