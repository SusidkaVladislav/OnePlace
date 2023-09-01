import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemCategory =({item})=>{
    return (
      
      <div className='sales-body'>
        <label>Item Category</label>
        <label> { item }</label>
      </div>
    );
  
};

export default ItemCategory;