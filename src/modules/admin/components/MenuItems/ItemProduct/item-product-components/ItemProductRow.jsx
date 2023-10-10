import React from 'react';
import './ItemProductRowStyles.css';

const ItemProductRow = props =>
{
    const {
        key,
        picture,
        name,
        code,
        price,
        color,
        quantity,
    } = props;


    return (
        <div className='item-product-row-container' key={key}>
            <img className='item-product-row-img' src={picture} />
            <label>{name}</label>
            <label>{code}</label>
            <label>{price + ' ₴'}</label>
            <label>{color}</label>
            <label>{quantity + ' одн.'}</label>
        </div>
    )
}

export default ItemProductRow;