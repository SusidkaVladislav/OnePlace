import React from 'react';

const VerificationCodeUnit = (props) =>
{
    const {
        getValue,
        index,
    } = props;

    const lastDigit = (number) =>
    {
        return number.toString().split('').pop();
    }

    const handleChange = ({ target }) =>
    {
        //alert(target.toString());

        const regex = /^[0-9]$/;

        if (!regex.test(target.value))
        {
            if (target.value !== NaN)
                target.value = Number(lastDigit(target.value));
        }
        if (target.value !== NaN)
            getValue(target.value);
    }

    const handlerKeyDown = (event) => {
        alert(2)
    }

    return (<input
        key={index}
        type='number'
        className='code-piece'
        onKeyDown={handleChange}
    />)
}

//onClick={handleChange}


export default VerificationCodeUnit;