import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemProduct =({item})=>{
    return (
      
      <div className='sales-body'>
        <label>Item Product</label>
        <label> { item }</label>
      </div>
    );
  
};

export default ItemProduct;