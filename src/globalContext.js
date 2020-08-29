import React, { useState } from 'react';

export const GlobalContext = React.createContext({
    logedIn: false,
    title: '',
    changeTitle: (newT) => { },
    changeLogedIn: (newV) => { }
});

const GlobalContextProvider = props => {
    const [localLogedIn, setlocalLogedIn] = useState(false);
    const [localTitle, setLocalTitle] = useState('');
    const changeTitleHandler = (newT) => {
        setLocalTitle(newT);
    }
    const changeLogedInHandler = (newV) => {
        setlocalLogedIn(newV);
    }
    return (
        <GlobalContext.Provider value={{ logedIn: localLogedIn, changeLogedIn: changeLogedInHandler, changeTitle: changeTitleHandler, title: localTitle }}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;