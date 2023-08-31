import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemMessage =({item})=>{
    return (
      
      <div className='sales-body'>
        <label>Item Message</label>
        <label> { item }</label>
      </div>
    );
  
};

export default ItemMessage;