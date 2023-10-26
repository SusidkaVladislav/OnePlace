import React, { useState, useEffect } from 'react';
import './UserRegisterFormStyles.css';

import BrownCloseCrossIcon from '../../../../svg/shared-icons/BrownCloseCrossIcon.svg';
import VerticalLine from '../../../../svg/login-icons/VerticalLine';
import GoogleIcon from '../../../../svg/login-icons/GoogleIcon';
import FacebookIcon from '../../../../svg/login-icons/FacebookIcon';

import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setName, setSurname, setEmail, setPhoneNumber, setPassword, setIsAgree, registerUser, reset } from './userRegisterSlice';

const UserRegisterForm = () =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const { name,
        surname,
        password,
        email,
        phoneNumber,
        isAgree,
        nameError,
        surnameError,
        emailError,
        phoneNumberError,
        passwordError,
        isAgreeError,
        errorFromServer,
        messageFromServer } = useSelector(state => state.userRegister);

    const handleClose = () =>
    {
        dispatch(reset());
        navigate(-1);
    }

    const handleNameChange = (event) =>
    {
        dispatch(setName(event.target.value));
    }

    const handleSurnameChange = (event) =>
    {
        dispatch(setSurname(event.target.value));
    }

    const handleEmailChange = (event) =>
    {
        dispatch(setEmail(event.target.value));
    }

    const handlePhoneChange = (event) =>
    {
        dispatch(setPhoneNumber(event.target.value));
    }

    const handlePasswordChange = (event) =>
    {
        dispatch(setPassword(event.target.value));
    }

    const handleCheckboxChange = (event) =>
    {
        dispatch(setIsAgree(event.target.checked));
    }

    const handleGoogle = () =>
    {

    }

    const handleFacebook = () =>
    {

    }

    const handleRegister = async () =>
    {
        try
        {
            await dispatch(registerUser()).unwrap();
            dispatch(reset());
            navigate('/user-login');

        } catch (rejectedValueOrSerializedError) { }
    }

    return (
        <div className='register-body'>
            <div className='register-div'>
                <div className='register-label'>
                    <label className='register-label-h'>Реєстрація</label>
                    <button
                        className="cross-button "
                        onClick={handleClose}
                        style={{
                            backgroundImage: `url(${BrownCloseCrossIcon})`,
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                </div>

                <label
                    className={errorFromServer ?
                        'error-message' : 'success-message'
                    }
                >{messageFromServer}</label>

                <div className='register-body-h'>
                    <div className='register-body-left'>
                        <div className='left-one'>
                            <div className="left-post">
                                <label className="text-left-post">Ім'я</label>
                                <div className="input-wrapper">
                                    <input
                                        className="input-left-post"
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                        style={
                                            nameError.isError ?
                                                { borderColor: 'red' } :
                                                { borderColor: 'black' }
                                        }
                                    />
                                    {nameError.isError && <span className="error-icon"></span>}
                                </div>
                            </div>

                            <div className='error-email'>
                                {nameError.isError && <label className="error-message">{nameError.message}</label>}
                            </div>

                            <div className="left-post">
                                <label className="text-left-post">Прізвище</label>
                                <div className="input-wrapper">
                                    <input
                                        className="input-left-post"
                                        type="text"
                                        value={surname}
                                        onChange={handleSurnameChange}
                                        style={
                                            surnameError.isError ?
                                                { borderColor: 'red' } :
                                                { borderColor: 'black' }
                                        }
                                    />
                                    {surnameError.isError && <span className="error-icon"></span>}
                                </div>
                            </div>

                            <div className='error-email'>
                                {surnameError.isError && <label className="error-message">{surnameError.message}</label>}
                            </div>

                            <div className="left-post">
                                <label className="text-left-post">Ел.пошта</label>
                                <div className="input-wrapper">
                                    <input
                                        className="input-left-post"
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        style={
                                            emailError.isError ?
                                                { borderColor: 'red' } :
                                                { borderColor: 'black' }
                                        }
                                    />
                                    {emailError.isError && <span className="error-icon"></span>}
                                </div>

                            </div>

                            <div className='error-email'>
                                {emailError.isError && <label className="error-message">{emailError.message}</label>}
                            </div>

                        </div>
                        <div>
                            <div className="left-post">
                                <label className="text-left-post">Номер телефону</label>
                                <div className="code-country">
                                    <div className='code-dropdown-header'>
                                        <div
                                            className={`code-main-select-item `}
                                        >
                                            <img src={'../../../../svg/loginIcons/flag.png'} title='ukraine-flag' alt='flag'></img>
                                            <label>+380</label>
                                        </div>
                                        <div className='input-wrapper'>
                                            <input
                                                className="input-right-phone"
                                                type="text"
                                                placeholder='00 00-00-000'
                                                value={phoneNumber}
                                                onChange={handlePhoneChange}
                                                style={
                                                    phoneNumberError.isError ?
                                                        { borderColor: 'red' } :
                                                        { borderColor: 'black' }
                                                }
                                            />
                                            {phoneNumberError.isError && <span className="error-icon"></span>}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='error-email'>
                                {phoneNumberError.isError && <label className="error-message">{phoneNumberError.message}</label>}
                            </div>
                            <div className="left-pswrd">

                                <label className="text-left-pswrd">Пароль</label>
                                <div className='input-wrapper'>
                                    <input
                                        className="input-left-post"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        style={
                                            passwordError.isError ?
                                                { borderColor: 'red' } :
                                                { borderColor: 'black' }
                                        }
                                    />

                                    {showPassword ? (
                                        <span
                                            className="no-eye-icon-password eye-icon"
                                            onClick={() => setShowPassword(!showPassword)}
                                        ></span>
                                    ) : (
                                        <span
                                            className="eye-icon-password eye-icon"
                                            onClick={() => setShowPassword(!showPassword)}
                                        ></span>
                                    )}
                                </div>

                            </div>

                            <div className='error-pswrd'>
                                {passwordError.isError && <label className="reg-error-message">{passwordError.message}</label>}
                            </div>

                            <div className='check-register'>
                                <div className='check-register-input'>
                                    <input
                                        type='checkbox'
                                        checked={isAgree}
                                        onChange={handleCheckboxChange} />
                                </div>
                                <label>
                                    Реєструючись, ви погоджуєтесь з
                                    обробкою і захистом персональних
                                    даних та угодою користувача
                                </label>

                            </div>
                            <div className='error-pswrd'>
                                {isAgreeError.isError && <label className="error-message">{isAgreeError.message}</label>}
                            </div>
                        </div>
                        <div className="reg-vertical-line">
                            <VerticalLine />
                        </div>
                        <div className="enter-body-foot-right">
                            <label className='text-right-enter'>Увійти як користувач</label>
                            <div className='icons-right-enter'>
                                <div className='google-right-enter'>
                                    <button className="google-button" onClick={handleGoogle}>
                                        <GoogleIcon />
                                    </button>
                                    <label className='label-google'>Google</label>
                                </div>
                                <div className='facebook-right-enter'>
                                    <button className="facebook-button" onClick={handleFacebook}>
                                        <FacebookIcon />
                                    </button>
                                    <label className='label-facebook'>Facebook</label>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='div-register-button-two'>
                        <div>
                            <button className='register-button-two' onClick={handleRegister}>Зареєструватися</button>
                        </div>
                        <div>
                            <Link to='/user-login' className='text-back-tologin'>Я вже зареєстрований</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRegisterForm;