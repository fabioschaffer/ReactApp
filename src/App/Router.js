import '../App/Router.css';
import React, { useContext,useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { GlobalContext } from "../GlobalContext";
import Login from "./Login";
import Customer from '../Customer/Customer';
import Product from "../Product/Product";

function Router() {
    const globalContext = useContext(GlobalContext);

    useEffect(() => {
        document.title = 'Vendas';
      });

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