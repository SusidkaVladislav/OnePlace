import React, { useState, useEffect } from 'react';

import '../../../admin/features/adminAuth/AuthStyles.css';
import './ChangePasswordStyles.css'

import { useNavigate } from 'react-router-dom';
import { Stack, Grid } from '@mui/material';
import OnePlaceIcon from '../../../../svg/login-icons/OnePlaceIcon';
import BackTextAndArrowIcon from '../../../../svg/arrows/BackTextAndArrowIcon';

import VerificationLogic from '../../../../services/verification/VerificationLogic';
import PasswordInput from '../../../../services/passwordInputs/PasswordInput';

import { useSelector } from 'react-redux/es/hooks/useSelector';

import { useDispatch } from 'react-redux';
import { setPassword, setConfirmPassword, isPasswordStrong, isMatched, resetPasswordState } from '../../../admin/features/servicesState/passwordState';
import { reset } from '../../../admin/features/servicesState/verificationCodeState';
import
{
    setIsLoginFormOpen,
    setIsRenewPasswordFormOpen,
} from '../../features/userAuth/userAuthSlice';

const AdminChangePassword = () =>
{
    //const navigate = useNavigate();
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
        if (!hasErrors && !errorMatch)
        {

            //Зміна паролю

            //dispatch(reset());
            //dispatch(resetPasswordState())
            //navigate(-1);
        }

    }, [hasErrors, errorMatch]);

    return (

        <div
            className='modal-backdrop'
        >
            <Stack
                className='change-pass-div '
                width={'28%'}
                minWidth={'250px'}
                height={'fit-content'}
                padding={'2%'}
                top={'20%'}
                left={'38%'}
            >
                <span
                    className='go-back-icon'
                    onClick={() =>
                    {
                        dispatch(setIsLoginFormOpen(true));
                        dispatch(setIsRenewPasswordFormOpen(false));

                        //dispatch(reset());
                        //dispatch(resetPasswordState());
                        // navigate(-1)
                    }}>
                    <BackTextAndArrowIcon />
                </span>

                {/* <div className='change-pass-div'> */}


                {!isEmailCorrect && !isCodValid &&
                    // <div className='change-body-div'>
                    <Grid
                        container
                        padding={'2%'}
                        md={12}
                        sm={12}
                        xs={12}
                        item
                        justifyContent="center"
                    >
                        <Stack
                            md={12}
                            sm={12}
                            xs={12}
                            marginBottom={'5%'}
                            sx={{
                                width: '100%'
                            }}
                        >
                            <label className="t2-medium">Пошта</label>
                            <div className="input-wrapper">
                                <input
                                    className="login-user-text-input"
                                    type="email"
                                    onChange={handleEmailChange}
                                    style={{
                                        borderColor: EmailBorderColor,
                                    }} />

                                {EmailErrorIcon && <span className="error-icon-email"></span>}
                            </div>
                        </Stack>

                        <button
                            className='confirm-button'
                            onClick={handleGetCode}
                        >
                            Отримати код
                        </button>
                    </Grid>

                }
                {isEmailCorrect && !isCodValid &&
                    <VerificationLogic />
                }
                {isCodValid &&
                    // <div className='change-body-div'>
                    <Grid
                        container
                        justifyContent={'center'}
                    >
                        <Stack
                            md={12}
                            sm={12}
                            xs={12}
                            sx={{
                                marginBottom: '1%',
                                width: '100%'
                            }}
                        >
                            <label className="t2-medium">Новий пароль</label>
                            <PasswordInput onChange={handlePasswordChange} />
                            {(hasErrors && errorMessage.length > 0) && <label className="error-text">{errorMessage}</label>}
                        </Stack>

                        <Stack
                            md={12}
                            sm={12}
                            xs={12}
                            sx={{
                                marginBottom: '1%',
                                width: '100%'
                            }}
                        >
                            <label className="t2-medium">Підтвердіть новий пароль</label>
                            <PasswordInput onChange={handlePasswordConfirmChange} />
                            {(errorMatch && !hasErrors) && <label className="error-text">Паролі не співпадають</label>}
                        </Stack>

                        <button className='confirm-button' onClick={handleConfirm}>Підтвердити</button>
{/* 
                        <div className='error-text-wrapper'>
                            
                        </div> */}

                        {/* <div className='change-button'> */}
                            
                        {/* </div> */}
                    </Grid>

                    // </div>
                }


                {/* 


                     */}
                {/* </div> */}

            </Stack>
        </div >
    )
}

export default AdminChangePassword;