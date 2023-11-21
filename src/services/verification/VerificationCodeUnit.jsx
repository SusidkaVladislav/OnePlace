import React from 'react';
import './verificationCodeStyle.css'
import { useSelector } from 'react-redux';


const VerificationCodeUnit = (props) =>
{
    const {
        getValue,
        index
    } = props;

    const lastDigit = (number) =>
    {
        return number.toString().split('').pop();
    }

    const handleChange = ({ target }) =>
    {
        const regex = /^[0-9]$/;

        if (!regex.test(target.value))
        {
            if (target.value !== '')
                target.value = Number(lastDigit(target.value));
        }

        getValue(target.value);
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
        <input
            key={index}
            style={{ borderColor: useSelector(state => state.verificationCode.codeUnitColor) }}
            type='number'
            className='code-piece'
            onChange={handleChange}
            onKeyDown={handlerKeyDown}
        />
    )
}

export default VerificationCodeUnit;