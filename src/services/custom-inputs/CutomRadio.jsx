import React from 'react';
import GreenRadioCheckIcon from '../../svg/shared-icons/GreenRadioCheckIcon';
import './CustomInputsStyles.css';

const CustomRadio = (props) =>
{
    const {
        name,
        checked,
        onChange,
    } = props;

    return (
        <label className="custom-radio">
            <input
                type="radio"
                name={name}
                checked={checked}
                onClick={onChange}
            />
            <span className='custom-radio-checkmark'>
                <GreenRadioCheckIcon />
            </span>
        </label>
    )
}

export default CustomRadio;