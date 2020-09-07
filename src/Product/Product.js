import '../Product/Product.css';
import React, { useContext,useEffect   } from 'react';
import {GlobalContext} from '../GlobalContext';

export default function Product() {
    
    const globalContext = useContext(GlobalContext);
    useEffect(() => {
        globalContext.changeTitle('Produto');
      });

      return (
        <div id ="divProduct">
            <p>Produto</p>
        </div>
    )
}