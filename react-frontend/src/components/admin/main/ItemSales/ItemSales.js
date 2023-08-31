import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemSalesStyle.css';

const ItemSales =({item})=>{
    return (
      
      <div className='sales-body'>
        <label>Item sales</label>
        <label> { item }</label>
      </div>
    );
  
};

export default ItemSales;