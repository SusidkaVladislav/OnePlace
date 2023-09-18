import React, { useState } from 'react';
import VerificationCodeUnit from './VerificationCodeUnit';
import { changeBorderStyle, setValidCode } from '../../modules/admin/features/servicesState/verificationCodeState';
import { useDispatch, useSelector } from 'react-redux';

const VerificationLogic = () =>
{
    const dispatch = useDispatch();

    const [digits, setDigits] = useState(['', '', '', '', '', '']);

    const handleCheckCode = () =>
    {
        var code = digits.join('');
        //Тут йде запит на сервер де перевіряється валідність вказаного коду

        //Якщо код правильний
        if (code.length === 6)
        {
            dispatch(changeBorderStyle('green'));
            dispatch(setValidCode(true));
        }
        else
        {
            dispatch(changeBorderStyle('red'));
        }
    };

    const handleGetCodeUnit = (index, value) =>
    {
        const updatedDigits = [...digits];
        updatedDigits[index] = value;
        setDigits(updatedDigits);
    }

    return (
        <>
            <div className="left-post">
                <label className="label-form">Введіть код:</label>
                <div className='confirm-code-wrapper'>
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(0, value)} index={0} />
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(1, value)} index={1} />
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(2, value)} index={2} />
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(3, value)} index={3} />
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(4, value)} index={4} />
                    <VerificationCodeUnit getValue={value => handleGetCodeUnit(5, value)} index={5} />
                </div>
            </div>
            <div className='change-button'>
                <button className='confirm-button' onClick={handleCheckCode}>Перевірити</button>
            </div>
        </>
    )
}

export default VerificationLogic;