import React from 'react';
import GreenCheckCheckboxIcon from '../../svg/shared-icons/GreenCheckCheckboxIcon';
import './CustomInputsStyles.css';

const CustomCheckbox2 = (props) =>
{
    const {
        onChange,
        value,
        productId,
    } = props;

    return (
        <label className="custom-checkbox-2">
            <input
                type="checkbox"
                value={productId}
                checked={value}
                onChange={() =>
                {
                    onChange(!value)
                }}
            />
            <span className='custom-checkbox-checkmark-1'><GreenCheckCheckboxIcon /></span>
        </label>
    )
}

export default CustomCheckbox2;