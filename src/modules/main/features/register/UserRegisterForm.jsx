import React, { useState, useEffect } from 'react';
import './UserRegisterFormStyles.css';

import BrownCloseCrossIcon from '../../../../svg/shared-icons/BrownCloseCrossIcon.svg';
import GoogleIcon from '../../../../svg/login-icons/GoogleIcon';
import FacebookIcon from '../../../../svg/login-icons/FacebookIcon';
import PasswordInput from '../../../../services/passwordInputs/PasswordInput';
import GreenCheckCheckboxIcon from '../../../../svg/shared-icons/GreenCheckCheckboxIcon';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Stack, Grid } from '@mui/material';

import
{
    registerUser,
} from './userRegisterSlice';
import
{
    setIsRegisterFormOpen,
    setIsLoginFormOpen,
} from '../userAuth/userAuthSlice';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import LoadingAnimation from '../../../../common-elements/loading/LoadingAnimation';

const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]+$/;
const NO_SERVER_CONNECTION_PATH = "/no_server_connection";
const UserRegisterForm = () =>
{
    const errorsDefaultList = [
        { message: '', isError: false },
        { message: '', isError: false },
        { message: '', isError: false },
        { message: '', isError: false },
        { message: '', isError: false },
        { message: '', isError: false },
    ]

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [isAgree, setIsAgree] = useState(false)

    const [errorsList, setErrorsList] = useState(errorsDefaultList);
    const [dataValidated, setDataValidated] = useState(false);
    const {
        errorFromServer,
        messageFromServer,
        registerUserLoading,
        registerServerConnectionError,
    } = useSelector(state => state.userRegister);

    useEffect(() =>
    {

    }, [dataValidated]);

    const handleClose = () =>
    {
        dispatch(setIsRegisterFormOpen(false))
    }

    const resetError = (index) =>
    {
        var errors = errorsList;
        errors[index].message = '';
        errors[index].isError = false;
        setErrorsList(errors);
    }

    const handleNameChange = (event) =>
    {
        setName(event.target.value)
        resetError(0);
    }

    const handleSurnameChange = (event) =>
    {
        setSurname(event.target.value)
        resetError(1);
    }

    const handleEmailChange = (event) =>
    {
        setEmail(event.target.value)
        resetError(2);
    }

    const handlePhoneChange = (event) =>
    {
        setPhoneNumber(event.target.value)
        resetError(3);
    }

    const handlePasswordChange = (password) =>
    {
        setPassword(password)
        resetError(4);
    }

    const handleCheckboxChange = (event) =>
    {
        setIsAgree(event.target.checked)
        resetError(5);
    }

    const handleGoogle = () =>
    {
        // Реалізація планується на майбутнє
    }

    const handleFacebook = () =>
    {
        // Реалізація планується на майбутнє
    }

    const handleRegister = async () =>
    {
        validateData();
        setDataValidated(!dataValidated);

        if (errorsList.every((error) => error.isError === false))
        {
            const register = {
                name: name,
                surname: surname,
                phoneNumber: phoneNumber,
                email: email,
                password: password
            }

            await dispatch(registerUser(register)).then(({ payload }) =>
            {
                if (payload?.status === 200)
                {
                    setTimeout(() =>
                    {
                        dispatch(setIsRegisterFormOpen(false))
                        dispatch(setIsLoginFormOpen(true))
                    }, 1000)
                }
            })
        }
    }

    const validateData = () =>
    {
        var errors = errorsList;
        if (name.length < 2)
        {
            errors[0].message = "Введіть своє ім'я";
            errors[0].isError = true;
        }
        if (surname.length < 1)
        {
            errors[1].message = "Введіть своє прізвище";
            errors[1].isError = true;
        }
        if (email.length < 1)
        {
            errors[2].message = "Введіть пошту";
            errors[2].isError = true;
        }
        else if (!EMAIL_PATTERN.test(email))
        {
            errors[2].message = "Пошту введено некоректно";
            errors[2].isError = true;
        }
        if (phoneNumber.length < 9)
        {
            errors[3].message = "Введіть номер телефону";
            errors[3].isError = true;
        }
        else if (!PHONE_PATTERN.test(phoneNumber))
        {
            errors[3].message = "Некоректний номер";
            errors[3].isError = true;
        }
        if (password.length < MIN_PASSWORD_LENGTH)
        {
            errors[4].message = `Пароль повинен містити мінімум ${MIN_PASSWORD_LENGTH} символів`;
            errors[4].isError = true;
        }
        else if (!PASSWORD_PATTERN.test(password))
        {
            errors[4].message = 'Занадто слабкий пароль';
            errors[4].isError = true;
        }
        if (!isAgree)
        {
            errors[5].message = "Ви не погодилися на використання даних";
            errors[5].isError = true;
        }
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

                setName(res.data.given_name)
                setSurname(res.data.family_name)
                setEmail(res.data.email)
            } catch (err)
            {
                console.log(err);
            }
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    if (registerServerConnectionError)
    {
        navigate(NO_SERVER_CONNECTION_PATH);
    }
    if (registerUserLoading)
    {
        return <LoadingAnimation />
    }

    return (
        <div
            className='modal-backdrop'
        >
            <Stack
                className='register-body'
                sx={{
                    width: {
                        md: '70%',
                        sm: '80%',
                        xs: '90%',
                    }
                }}

                height={'fit-content'}
                padding={'1%'}
            >

                <Stack
                    direction={'row'}
                    padding={'2%'}
                >
                    <h3>Реєстрація</h3>
                    <button
                        className="close-register-form "
                        onClick={handleClose}
                        style={{
                            backgroundImage: `url(${BrownCloseCrossIcon})`,
                            backgroundRepeat: 'no-repeat',
                            alignSelf: 'center',
                        }}
                    />
                </Stack>

                <label
                    className={errorFromServer ?
                        'error-message' : 'success-message'
                    }
                >{messageFromServer}</label>

                <Grid
                    container
                    item
                    direction={'row'}
                    xs={12}
                >
                    <Grid
                        container
                        item
                        padding={'2%'}
                        md={8}
                        xs={12}
                        sx={{
                            borderRight: '1px solid  #CED8DE',
                            '@media screen and (max-width: 900px)': {
                                border: 'none',
                            },
                        }}
                    >

                        <Grid
                            container
                            item
                            md={6}
                            sm={12}
                            xs={12}
                            padding={'2%'}
                        >
                            <Stack
                                md={12}
                                sm={12}
                                xs={12}
                                sx={
                                    {
                                        '@media screen and (max-width: 900px)': {
                                            marginBottom: '5%',
                                        },
                                        width: '100%'
                                    }
                                }
                            >
                                <label className="t2-medium">Ім'я</label>
                                <div className="input-wrapper">
                                    <input
                                        className="register-user-text-input"
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
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
                                md={12}
                                sm={12}
                                xs={12}
                                sx={
                                    {
                                        '@media screen and (max-width: 900px)': {
                                            marginBottom: '5%',
                                        },
                                        width: '100%',
                                    }
                                }
                            >
                                <label className="t2-medium">Прізвище</label>
                                <div className="input-wrapper">
                                    <input
                                        className="register-user-text-input"
                                        type="text"
                                        value={surname}
                                        onChange={handleSurnameChange}
                                        style={
                                            {
                                                border: errorsList[1].isError ? '1px  solid red' : 'none'
                                            }
                                        }
                                    />
                                    {errorsList[1].isError && <span className="error-icon"></span>}
                                </div>
                                <div
                                    className="t2-medium-red error-register"
                                >
                                    <span
                                        style={{
                                            visibility: errorsList[1].isError ? 'visible' : 'hidden',
                                        }}

                                    >{errorsList[1].message}</span>
                                </div>
                            </Stack>


                            <div className='error-email'>
                            </div>
                            <Stack
                                md={12}
                                sm={12}
                                xs={12}
                                sx={
                                    {
                                        '@media screen and (max-width: 900px)': {
                                            marginBottom: '2%',
                                        },
                                        width: '100%',
                                    }
                                }
                            >
                                <label className="t2-medium">Ел.пошта</label>
                                <div className="input-wrapper">
                                    <input
                                        className="register-user-text-input"
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        style={
                                            {
                                                border: errorsList[2].isError ? '1px  solid red' : 'none'
                                            }
                                        }
                                    />
                                    {errorsList[2].isError && <span className="error-icon"></span>}
                                </div>
                                <div
                                    className="t2-medium-red error-register"
                                >
                                    <span
                                        style={{
                                            visibility: errorsList[2].isError ? 'visible' : 'hidden',
                                        }}

                                    >{errorsList[2].message}</span>
                                </div>
                            </Stack>
                        </Grid>

                        <Grid
                            item
                            container
                            md={6}
                            padding={'2%'}
                        >
                            <Stack
                                md={12}
                                sm={12}
                                xs={12}
                                sx={
                                    {
                                        '@media screen and (max-width: 900px)': {
                                            marginBottom: '5%',
                                        },
                                        width: '100%',
                                    }
                                }
                            >
                                <label className="t2-medium">Номер телефону</label>
                                <div className="input-wrapper">
                                    <input
                                        className="register-user-text-input"
                                        type="text"
                                        placeholder='+38'
                                        value={phoneNumber}
                                        onChange={handlePhoneChange}
                                        style={
                                            {
                                                border: errorsList[3].isError ? '1px  solid red' : 'none'
                                            }
                                        }
                                    />
                                    {errorsList[3].isError && <span className="error-icon"></span>}
                                </div>
                                <div
                                    className="t2-medium-red error-register"
                                >
                                    <span
                                        style={{
                                            visibility: errorsList[3].isError ? 'visible' : 'hidden',
                                        }}

                                    >{errorsList[3].message}</span>
                                </div>
                            </Stack>

                            <Stack
                                md={12}
                                sm={12}
                                xs={12}
                                sx={
                                    {
                                        '@media screen and (max-width: 900px)': {
                                            marginBottom: '5%',
                                        },
                                        width: '100%'
                                    }
                                }
                            >

                                <label className="t2-medium">Пароль</label>

                                <PasswordInput
                                    style={
                                        {
                                            height: '46px'
                                        }
                                    }
                                    onChange={handlePasswordChange}
                                    isError={errorsList[4].isError}
                                />
                                <div
                                    className="t2-medium-red error-register"
                                >
                                    <span
                                        style={{
                                            visibility: errorsList[4].isError ? 'visible' : 'hidden',
                                        }}

                                    >{errorsList[4].message}</span>
                                </div>
                            </Stack>

                            <Grid
                                item
                                container
                                xs={12}
                                direction={'row'}
                                gap={'4%'}
                                alignItems={'center'}
                                sx={
                                    {
                                        '@media screen and (max-width: 900px)': {
                                            marginBottom: '5%',
                                        },
                                        width: '100%'
                                    }
                                }
                            >
                                <label className="filter-message-custom-checkbox"
                                    style={{
                                        width: '6%',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isAgree}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className='filter-message-custom-checkbox-checkmark'><GreenCheckCheckboxIcon /></span>
                                </label>
                                <label
                                    className='t3-light'
                                    style={{
                                        width: '90%'
                                    }}
                                >
                                    Реєструючись, ви погоджуєтесь з
                                    обробкою і захистом персональних
                                    даних та угодою користувача
                                </label>

                                <div
                                    className="t2-medium-red error-register"
                                >
                                    <span
                                        style={{
                                            visibility: errorsList[5].isError ? 'visible' : 'hidden',
                                        }}

                                    >{errorsList[5].message}</span>
                                </div>
                            </Grid>

                        </Grid>
                        <Grid
                            container
                            direction={'column'}
                        >
                            <button
                                className='enter-button'
                                onClick={handleRegister}
                                style={{
                                    width: '50%',
                                    alignSelf: 'center',
                                    marginBottom: '2%',
                                }}
                            >Зареєструватися</button>
                            <h5
                                className='light-blue'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() =>
                                {
                                    dispatch(setIsRegisterFormOpen(false));
                                    dispatch(setIsLoginFormOpen(true));
                                }}
                            >Я вже зареєстрований</h5>
                        </Grid>

                    </Grid>

                    <Grid
                        item
                        container
                        md={4}
                        xs={12}
                        padding={'2%'}
                        justifyContent={'center'}
                    >
                        <label
                            style={{
                                alignSelf: 'center'
                            }}
                            className='t1-bold'>Увійти як користувач</label>
                        <Grid
                            container
                            direction={'row'}
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
        </div >
    );
}

export default UserRegisterForm;