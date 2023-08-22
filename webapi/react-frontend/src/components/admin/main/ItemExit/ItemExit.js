import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemExit =({item})=>{
    return (
      
      <div className='sales-body'>
        <label>Item Exit</label>
        <label> { item }</label>
      </div>
    );
  
};

export default ItemExit;