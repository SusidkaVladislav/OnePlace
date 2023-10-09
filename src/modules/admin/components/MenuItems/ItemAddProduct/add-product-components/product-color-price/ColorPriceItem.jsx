import React, { useState, useRef } from 'react';
import './ColorPriceItemStyles.css';

import { useDispatch } from 'react-redux';

import
{
    updateColorPriceBlock,
    setColorValid,

} from '../../../../../features/adminProduct/adminProductSlice';

const ColorPriceItem = (props) =>
{
    const dispatch = useDispatch();

    const {
        productColorsBlocks,
        colors,
        deleteColorPriceBlock,
    } = props;

    const [color, setColor] = useState(productColorsBlocks.colorId ? productColorsBlocks.colorId : 1);
    const [quantity, setQuantity] = useState(productColorsBlocks.quantity ? productColorsBlocks.quantity : 0);
    const [price, setPrice] = useState(productColorsBlocks.price ? productColorsBlocks.price : 0);

    const deleteBlock = (blockId) =>
    {
        deleteColorPriceBlock(blockId);
    }

    const handlerKeyDown = (event) =>
    {
        if (event.which === 69 || event.which === 189
            || event.which === 107 || event.which === 109
            || event.which === 190 || event.which === 187)
        {
            event.preventDefault();
        }
    }

    return (
        <div className='color-price-add-product' key={productColorsBlocks.blockId}>
            <div>
                <label>Колір</label>

                <select className='select-color' value={color} onChange={(event) =>
                {
                    setColor(event.target.value)

                    dispatch(setColorValid(true))

                    dispatch(updateColorPriceBlock(
                        {
                            blockId: Number(productColorsBlocks.blockId),
                            colorId: Number(event.target.value),
                            quantity: Number(quantity),
                            price: Number(price),
                        }
                    ))
                }}>
                    {colors.map((color) => (
                        <option key={color.id} value={color.id} >{color.name}</option>
                    ))}
                </select>

            </div>

            <div>
                <label>Кількість</label>
                <input
                    className='add-product-number-input'
                    type="number"
                    value={quantity}

                    onChange={(event) =>
                    {
                        setQuantity(event.target.value);
                        dispatch(updateColorPriceBlock(
                            {
                                blockId: Number(productColorsBlocks.blockId),
                                colorId: Number(color),
                                quantity: Number(event.target.value),
                                price: Number(price),
                            }
                        ))
                    }}
                    onKeyDown={handlerKeyDown}
                />
            </div>

            <div>
                <label>Ціна</label>
                <input
                    className='add-product-number-input'
                    type='number'
                    min={1}
                    value={price}
                    onKeyDown={handlerKeyDown}
                    onChange={(event) =>
                    {
                        setPrice(event.target.value)
                        dispatch(updateColorPriceBlock(
                            {
                                blockId: Number(productColorsBlocks.blockId),
                                colorId: Number(color),
                                quantity: Number(quantity),
                                price: Number(event.target.value),
                            }
                        ))
                    }}
                />
            </div>

            <button className='add-color-price-product-btn' style={{ marginTop: '30px' }}
                onClick={() => deleteBlock(productColorsBlocks.blockId)}> - </button>

        </div>
    )
}

export default ColorPriceItem;