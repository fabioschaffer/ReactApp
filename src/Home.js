import React, { useContext,useEffect   } from 'react';
import {GlobalContext} from './globalContext';
import './Home.css';

export default function Home() {
    
    const globalContext = useContext(GlobalContext);
    useEffect(() => {
        globalContext.changeTitle('Início');
      });

      return (
        <div id ="divHome">
            <img src="../graphic.jpg" />
        </div>
    )
}