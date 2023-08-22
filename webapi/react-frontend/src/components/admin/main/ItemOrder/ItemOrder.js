import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemOrder =({item})=>{
    return (
      
      <div className='sales-body'>
        <label>Item Order</label>
        <label> { item }</label>
      </div>
    );
  
};

export default ItemOrder;