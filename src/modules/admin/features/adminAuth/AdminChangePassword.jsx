import React, { useState } from 'react';
import './adminChangePassword.css'

import { useNavigate } from 'react-router-dom';

import OnePlaceIcon from '../../svg/loginIcons/OnePlaceIcon';
import ArrowBack from '../../svg/sharedIcons/BackIcon';

import VerificationCodeUnit from '../../../../services/verification/VerificationCodeUnit';

const AdminChangePassword = () =>
{
    const navigate = useNavigate();
    const [EmailBorderColor, setEmailBorderColor] = useState('');
    const [EmailErrorIcon, setEmailErrorIcon] = useState(false);

    const [isEmailCorrect, setIsEmailCorrect] = useState(false);
    const [ReceiveCode, setReceiveCode] = useState(false);

    const [digits, setDigits] = useState(['', '', '', '', '', '']);

    const handleEmailChange = (event) =>
    {

    };

    const handleGetCode = (event) =>
    {
        //Перевірити валідність пошти

        // Якщо пошту введено неправильно
        if (false)
        {
            setEmailErrorIcon(true);
            setEmailBorderColor('red');
        }
        //Правильна пошта
        else
        {
            setIsEmailCorrect(true)
        }
    }

    const handleCheckCode = () =>
    {
        alert(digits)
    }

    const handleGetCodeUnit = (index, value) =>
    {
        const updatedDigits = [...digits];
        updatedDigits[index] = value;
        setDigits(updatedDigits);
    }


    return (
        <div className='change-body'>
            <span className='go-back-icon' onClick={() => { navigate(-1) }}>
                <ArrowBack />
            </span>

            <div className='change-div'>
                <OnePlaceIcon />

                {!isEmailCorrect &&
                    <div className='change-body-div'>
                        <div className="left-post">
                            <label className="label-form">Пошта</label>
                            <div className="input-wrapper">
                                <input className="input-text-form" type="email"
                                    onChange={handleEmailChange}
                                    style={{ borderColor: EmailBorderColor }} />
                                {EmailErrorIcon && <span className="error-icon-email"></span>}
                            </div>
                        </div>
                        <div className='change-button'>
                            <button className='confirm-button' onClick={handleGetCode}>Отримати код</button>
                        </div>
                    </div>
                }
                {isEmailCorrect &&
                    <div className='change-body-div'>
                        <div className="left-post">
                            <label className="label-form">Введіть код:</label>
                            <div className='confirm-code-wrapper'>
                                <VerificationCodeUnit getValue={value => handleGetCodeUnit(0, value)} index={0}/>
                                <VerificationCodeUnit getValue={value => handleGetCodeUnit(1, value)} index={1}/>
                                <VerificationCodeUnit getValue={value => handleGetCodeUnit(2, value)} index={2}/>
                                <VerificationCodeUnit getValue={value => handleGetCodeUnit(3, value)} index={3}/>
                                <VerificationCodeUnit getValue={value => handleGetCodeUnit(4, value)} index={4}/>
                                <VerificationCodeUnit getValue={value => handleGetCodeUnit(5, value)} index={5}/>
                            </div>
                        </div>
                        <div className='change-button'>
                            <button className='confirm-button' onClick={handleCheckCode}>Перевірити</button>
                        </div>
                    </div>
                }


            </div>

        </div>
    )
}

export default AdminChangePassword;

