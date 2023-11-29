import React from 'react';
import GreenCheckCheckboxIcon from '../../svg/shared-icons/GreenCheckCheckboxIcon';
import './CustomInputsStyles.css';

const CustomCheckbox = () =>
{
    return (
        <label className="custom-checkbox-1">
            <input
                type="checkbox"
                //value={}
                //checked={}
                onChange={() =>
                {

                }}
            />
            <span className='custom-checkbox-checkmark-1'><GreenCheckCheckboxIcon /></span>
        </label>
    )
}

export default CustomCheckbox;