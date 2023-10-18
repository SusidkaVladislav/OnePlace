import React, { useState } from "react";
import './AddBrandFilterStyles.css';
import CloseCross from '../../../../../svg/sharedIcons/CloseCross';

const AddBrandFilter = (props) =>
{
    const {
        brandName,
        actionBrand,
        closeAddBrandDialog,
    } = props;

    const [name, setName] = useState(brandName ? brandName : '');
    const [nameValid, setNameValid] = useState(true);

    const closeHandler = () =>
    {
        setName('');
        setNameValid(true);
        closeAddBrandDialog();
    }

    return (
        <div className='add-brand-filter-container'>
            <div className='add-brand-header'>
                <label>Назва бренду</label>
                <span onClick={closeHandler}><CloseCross /></span>
            </div>

            <input
                className='add-country-input'
                type='text'
                value={name}
                style={{
                    border: nameValid ? 'none' : '1px solid red',
                }}
                onChange={(event) =>
                {
                    setName(event.target.value);
                    setNameValid(true);
                }}
            />

            <div className='btn-add-country-container'>
                <button onClick={closeHandler}>Скасувати</button>
                <button onClick={() =>
                {
                    if (name.length > 0)
                    {
                        actionBrand(name);
                        setName('');
                        setNameValid(true);
                        closeAddBrandDialog();
                    } else
                    {
                        setNameValid(false);
                    }
                }}>Зберегти</button>
            </div>
        </div>
    )
}

export default AddBrandFilter;