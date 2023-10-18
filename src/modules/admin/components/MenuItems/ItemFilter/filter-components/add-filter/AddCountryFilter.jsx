import React, { useState, useEffect } from 'react';
import './AddCountryFilterStyles.css';
import CloseCross from '../../../../../svg/sharedIcons/CloseCross';

const AddCountryFilter = (props) =>
{
    const {
        countryName,
        actionCountry,
        closeAddCountryDialog,
    } = props;

    const [name, setName] = useState(countryName ? countryName : '');
    const [nameValid, setNameValid] = useState(true);

    const closeHandler = () =>
    {
        setName('');
        setNameValid(true);
        closeAddCountryDialog();
    }

    return (
        <div className='add-country-filter-container'>
            <div className='add-country-header'>
                <label>Назва країни</label>
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
                        actionCountry(name);
                        setName('');
                        setNameValid(true);
                        closeAddCountryDialog();
                    } else
                    {
                        setNameValid(false);
                    }
                }}>Зберегти</button>
            </div>
        </div>
    )
}

export default AddCountryFilter;