import React, { useState, useEffect } from 'react';

import '../../../admin/features/adminAuth/AuthStyles.css';
import './ChangePasswordStyles.css'

import { useNavigate } from 'react-router-dom';

import OnePlaceIcon from '../../../admin/svg/loginIcons/OnePlaceIcon';
import ArrowBack from '../../../admin/svg/sharedIcons/BackIcon';

import VerificationLogic from '../../../../services/verification/VerificationLogic';
import PasswordInput from '../../../../services/passwordInputs/PasswordInput';

import { useSelector } from 'react-redux/es/hooks/useSelector';

import { useDispatch } from 'react-redux';
import { setPassword, setConfirmPassword, isPasswordStrong, isMatched, resetPasswordState } from '../../../admin/features/servicesState/passwordState';
import { reset } from '../../../admin/features/servicesState/verificationCodeState';


const AdminChangePassword = () =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isCodValid = useSelector(state => state.verificationCode.isCodeValid);

    const [EmailBorderColor, setEmailBorderColor] = useState('');
    const [EmailErrorIcon, setEmailErrorIcon] = useState(false);
    const [isEmailCorrect, setIsEmailCorrect] = useState(false);

    const handlePasswordChange = (password) =>
    {
        dispatch(setPassword(password));
    };

    const handlePasswordConfirmChange = (confirm) =>
    {
        dispatch(setConfirmPassword(confirm));
    };


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

    const { errorMessage, errorMatch, hasErrors } = useSelector(state => state.passwordInputState);

    const handleConfirm = () =>
    {
        dispatch(isPasswordStrong())
        dispatch(isMatched())
    }

    useEffect(() =>
    {
        //Якщо все заповнено успішно, то можна міняти пароль
        if(!hasErrors && !errorMatch) {

            //Зміна паролю

            dispatch(reset());
            dispatch(resetPasswordState())
            navigate(-1);
        }
        
    }, [hasErrors, errorMatch]);

    return (
        <div className='change-body'>
            <span className='go-back-icon' onClick={() =>
            {
                dispatch(reset());
                dispatch(resetPasswordState());
                navigate(-1)
            }}>
                <ArrowBack />
            </span>

            <div className='change-div'>
                <OnePlaceIcon />

                {!isEmailCorrect && !isCodValid &&
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
                {isEmailCorrect && !isCodValid &&
                    <div className='change-body-div'>
                        <VerificationLogic />
                    </div>
                }
                {isCodValid &&
                    <div className='change-body-div'>
                        <div className="left-post">
                            <label className="label-form">Новий пароль</label>
                            <PasswordInput onChange={handlePasswordChange} />
                        </div>

                        {(hasErrors && errorMessage.length > 0)  && <label className="error-text">{errorMessage}</label>}

                        <div className="left-post">
                            <label className="label-form">Підтвердіть новий пароль</label>
                            <PasswordInput onChange={handlePasswordConfirmChange} />
                        </div>

                        <div className='error-text-wrapper'>
                            {(errorMatch && !hasErrors) && <label className="error-text">Паролі не співпадають</label>}
                        </div>

                        <div className='change-button'>
                            <button className='confirm-button' onClick={handleConfirm}>Підтвердити</button>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default AdminChangePassword;