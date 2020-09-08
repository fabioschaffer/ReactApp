import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalContextProvider from './Utility/GlobalContext';

ReactDOM.render(
  <GlobalContextProvider>
    <App />
    </GlobalContextProvider>
    ,
  document.getElementById('root')
);