import React from 'react';
import GreenRadioCheckIcon from '../../svg/shared-icons/GreenRadioCheckIcon';
import './CustomInputsStyles.css';

const CustomRadio = (props) =>
{
    const {
        name,
        checked,
        onChange,
        disabled,
    } = props;

    return (
        <label className="custom-radio"
            style={{
                cursor: disabled ? 'default' : 'pointer'
            }}
        >
            <input
                type="radio"
                name={name}
                defaultChecked={checked}
                onClick={onChange}
                disabled={disabled}

            />
            <span className='custom-radio-checkmark'>
                <GreenRadioCheckIcon />
            </span>
        </label>
    )
}

export default CustomRadio;