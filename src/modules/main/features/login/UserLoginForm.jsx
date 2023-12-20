import React, { useState, useEffect } from 'react';
import './UserLoginFormStyles.css';

//#region Icons
import BrownCloseCrossIcon from '../../../../svg/shared-icons/BrownCloseCrossIcon.svg';
import GoogleIcon from '../../../../svg/login-icons/GoogleIcon';
import FacebookIcon from '../../../../svg/login-icons/FacebookIcon';
import ErrorInputIcon from '../../../../svg/login-icons/ErrorInputIcon';
//#endregion

import PasswordInput from '../../../../services/passwordInputs/PasswordInput';



import { useNavigate } from 'react-router-dom';

import { useGoogleLogin } from '@react-oauth/google';



import { Stack, Grid } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import
{
    setIsLoginFormOpen,
    setIsRegisterFormOpen,
    setIsRenewPasswordFormOpen,
} from '../../features/userAuth/userAuthSlice';

import
{
    resetState
} from '../../features/register/userRegisterSlice';

import
{
    userLogin
} from '../../features/login/userLoginSlice';

import axios from 'axios';

const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const UserLoginForm = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const errorsDefaultList = [
        { message: '', isError: false },
        { message: '', isError: false },
    ]

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const [errorsList, setErrorsList] = useState(errorsDefaultList);
    const [dataValidated, setDataValidated] = useState(false);

    //const [authError, setAuthError] = useState(false);

    const {
        errorFromServer,
        messageFromServer
    } = useSelector(state => state.userLogin);

    useEffect(() =>
    {

    }, [dataValidated]);
    // const {
    //     isLoginFormOpen
    // } = useSelector(state => state.userAuth);

    const handleClose = () => 
    {
        dispatch(setIsLoginFormOpen(false));
    };



    const handleEnter = async () =>
    {
        validateData();
        setDataValidated(!dataValidated);

        if (errorsList.every((error) => error.isError === false))
        {
            const login = {
                email: email,
                password: password
            }
            await dispatch(userLogin(login));
            navigate('/user');
        }
    }


    const handlePasswordChange = (password) =>
    {
        setPassword(password);
        var errors = errorsList;
        errors[1].message = '';
        errors[1].isError = false;
        setErrorsList(errors);
    }

    const handleEmailChange = (event) =>
    {
        setEmail(event.target.value);
        var errors = errorsList;
        errors[0].message = '';
        errors[0].isError = false;
        setErrorsList(errors);
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (response) => 
        {
            try
            {
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );
                console.log(res);
            } catch (err)
            {
                console.log(err);
            }
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const handleFacebook = () =>
    {

    }

    const validateData = () =>
    {
        var errors = errorsList;
        if (email.length < 1)
        {
            errors[0].message = "Введіть пошту";
            errors[0].isError = true;
        }
        else if (!EMAIL_PATTERN.test(email))
        {
            errors[0].message = "Пошту введено некоректно";
            errors[0].isError = true;
        }
        if (password.length < 1)
        {
            errors[1].message = 'Введіть пароль';
            errors[1].isError = true;
        }

        setErrorsList(errors);
    }


    return (
        <div
            className='modal-backdrop'
        >
            <Stack
                className="user-login-form"
                sx={{
                    width: {
                        md: '50%',
                        sm: '75%',
                        xs: '85%',
                    }
                }}
                height={'fit-content'}
                padding={'2%'}
            //top={'15%'}
            //left={'25%'}
            >
                <Stack
                    direction={'row'}
                    padding={'2%'}
                >
                    <h3>Вхід</h3>
                    <button
                        className="cross-button"
                        onClick={handleClose}
                        style={{
                            backgroundImage: `url(${BrownCloseCrossIcon})`,
                            backgroundRepeat: 'no-repeat',
                            alignSelf: 'center',

                        }}
                    />
                </Stack>

                <Grid
                    container
                    item
                    direction={'row'}
                    xs={12}
                >
                    <Grid
                        item
                        padding={'2%'}
                        md={6}
                        xs={12}

                        sx={{
                            borderRight: '1px solid  #CED8DE',
                            '@media screen and (max-width: 900px)': {
                                border: 'none',
                            },
                        }}
                    >

                        <label
                            className={errorFromServer ?
                                'error-message' : 'success-message'
                            }
                        >{messageFromServer}</label>

                        <Stack
                            xs={12}
                        >
                            <label className="t2-medium">Пошта</label>
                            <div className="input-wrapper">
                                <input className="login-user-text-input" type='email'
                                    value={email}
                                    onChange={handleEmailChange}
                                    style={
                                        {
                                            border: errorsList[0].isError ? '1px  solid red' : 'none'
                                        }
                                    }
                                />
                                {errorsList[0].isError && <span className="error-icon"></span>}
                            </div>
                            <div
                                className="t2-medium-red error-register"
                            >
                                <span
                                    style={{
                                        visibility: errorsList[0].isError ? 'visible' : 'hidden',
                                    }}

                                >{errorsList[0].message}</span>
                            </div>
                        </Stack>

                        <Stack
                            xs={12}
                            sx={{
                                marginBottom: '1%',
                            }}
                        >
                            <label className="t2-medium">Пароль</label>
                            <PasswordInput
                                style={
                                    {
                                        height: '46px'
                                    }
                                }
                                onChange={handlePasswordChange}
                                isError={errorsList[1].isError}
                            />
                        </Stack>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: 'end',
                                marginBottom: '5%',
                            }}
                        >
                            <label
                                className='t2-medium-blue'
                                onClick={() =>
                                {
                                    dispatch(setIsLoginFormOpen(false));
                                    dispatch(setIsRenewPasswordFormOpen(true))
                                }}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                Забули пароль?
                            </label>
                        </div>

                        <button
                            className='enter-button'
                            onClick={handleEnter}
                            style={{
                                marginBottom: '5%',
                            }}
                        >Увійти</button>

                        <h5
                            className='light-blue'
                            onClick={() =>
                            {
                                dispatch(resetState());
                                dispatch(setIsLoginFormOpen(false));
                                dispatch(setIsRegisterFormOpen(true));
                            }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            Зареєструватися
                        </h5>

                    </Grid>

                    <Grid
                        item
                        md={6}
                        xs={12}
                        padding={'2%'}
                        container
                        justifyContent={'center'}

                    >
                        <label
                            style={{
                                alignSelf: 'center'
                            }}
                            className='t1-bold'>Увійти як користувач</label>
                        <Grid
                            direction={'row'}
                            container
                            justifyContent={'center'}
                        >
                            <button
                                className="google-facebook-button"
                                style={{
                                    borderRight: '1px solid  #CED8DE',
                                    paddingRight: '10%'
                                }}
                                onClick={() => { googleLogin() }}
                            >
                                <GoogleIcon />
                            </button>

                            <button
                                className="google-facebook-button"
                                onClick={handleFacebook}
                                style={{
                                    paddingLeft: '10%'
                                }}
                            >
                                <FacebookIcon />
                            </button>

                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </div>

    )
}

export default UserLoginForm;