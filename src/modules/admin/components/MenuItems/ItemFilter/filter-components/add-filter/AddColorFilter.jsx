import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import './AddColorFilterStyles.css';

import CloseCross from '../../../../../svg/sharedIcons/CloseCross';

const AddColorFilter = (props) =>
{
    const {
        closeAddColorDialog,
        addColor,
        hex,
        name,
    } = props;

    const [colorValue, setColorValue] = useState(hex ? hex : '#0A3D58')
    const [colorName, setColorName] = useState(name ? name : '')
    const [rValue, setRValue] = useState(10)
    const [gValue, setGValue] = useState(61)
    const [bValue, setBValue] = useState(88)

    const [nameValid, setNameValid] = useState(true);

    useEffect(() =>
    {
        setColorValue(hex ? hex : '#0A3D58')
        setColorName(name ? name : '')
    }, [hex, name])

    const closeHandler = () =>
    {
        setNameValid(true);
        setColorValue('')
        setColorName('')
        closeAddColorDialog();
    }


    return (
        <div className='add-color-container'>
            <div className='add-color-header'>
                <label>Color Picker</label>
                <span onClick={closeHandler}><CloseCross /></span>
            </div>
            <div className='color-add-picker'>
                <ChromePicker color={colorValue} onChange={updatedColor =>
                {
                    setColorValue(updatedColor)
                    setRValue(updatedColor.rgb.r)
                    setGValue(updatedColor.rgb.g)
                    setBValue(updatedColor.rgb.b)
                }} />
                <div className='rgb-container'>
                    <label>R</label>
                    <span className='color-rgb-input' >{rValue}</span>
                    <label>G</label>
                    <span className='color-rgb-input' >{gValue}</span>
                    <label>B</label>
                    <span className='color-rgb-input' >{bValue}</span>
                    <div className='color-filter-example' style={{
                        backgroundColor: colorValue.hex ? colorValue.hex : colorValue,
                    }}></div>
                </div>
                <div className='color-name-container'>
                    <label>Назва кольору</label>
                    <input
                        style={{
                            border: nameValid ? 'none' : '1px solid red',
                        }}
                        className='color-name-input'
                        type="text"
                        value={colorName}
                        onChange={(event) =>
                        {
                            setNameValid(true);
                            setColorName(event.target.value)
                        }}
                    />
                </div>
                <div className='btn-add-color-container'>
                    <button onClick={closeHandler}>Скасувати</button>
                    <button onClick={() =>
                    {
                        if (colorName.length > 0)
                        {
                            addColor(colorValue.hex ? colorValue.hex : colorValue, colorName);
                            setColorName('');
                            setNameValid(true);
                        }
                        else
                        {
                            setNameValid(false);
                        }

                    }}>Зберегти</button>
                </div>
            </div>
        </div>
    )
}

export default AddColorFilter;