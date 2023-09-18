import React, { useState } from 'react';
import './UserLoginFormStyles.css';

//#region Icons
import CrossIcon from './../../svg/authIncons/CrossIcon.svg';
import VerticalLine from '../../svg/authIncons/VerticalLine';
import GoogleIcon from '../../svg/authIncons/GoogleIcon';
import FacebookIcon from '../../svg/authIncons/FacebookIcon';
import ErrorIcon from '../../svg/authIncons/ErrorIcon';
//#endregion

import PasswordInput from '../../../../services/passwordInputs/PasswordInput';

import { useNavigate, Link } from 'react-router-dom';

import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const UserLoginForm = () =>
{
    const navigate = useNavigate();

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [phoneBorderColor, setPhoneBorderColor] = useState('black');
    const [passwordBorderColor, setPasswordBorderColor] = useState('black');
    const [authError, setAuthError] = useState(false);

    const handleClose = () => 
    {
        navigate(-1);
    };

    const handlePhoneChange = (event) =>
    {
        setPhone(event.target.value);
    }
    var jwt = '';

    const handleEnter = () =>
    {
        if (!PHONE_PATTERN.test(phone))
        {
            setPhoneBorderColor('red');
            //alert("invalid phone")
        }
        else
        {
            setPhoneBorderColor('black');
        }

        if (password.length < 1)
        {
            setPasswordBorderColor('red');
        }
        else
        {
            setPasswordBorderColor('black');
        }

        if (PHONE_PATTERN.test(phone) && password.length > 1)
        {
            //Спроба ввійти залогінитися на сервері

            //Якщо буде помилка
            setAuthError(true);
            
            alert(jwt)
            alert(jwt_decode(jwt));
        }
    }

    const handlePasswordChange = (password) =>
    {
        setPassword(password);
    }


    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
          const userEmail = codeResponse.profileObj.email; // Assuming the email is available in the profileObj
          console.log('User email:', userEmail);
        },
        onError: (error) => console.log('Login Failed:', error)
      });

    const handleFacebook = () =>
    {

    }

    return (
        <div className="enter-body">
            <div className="enter-body-cart">

                <div className="enter-body-head">
                    <h2 className="enter-body-head-text">Вхід</h2>
                    <button
                        className="cross-button "
                        onClick={handleClose}
                        style={{
                            backgroundImage: `url(${CrossIcon})`,
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                </div>

                <div className="enter-body-foot">
                    <div className="enter-body-foot-left">

                        {authError &&
                            <label className="error-message">
                                <ErrorIcon />
                                Невіриний телефон або пароль
                            </label>}

                        <div className="left-post">
                            <label className="text-left-post">Номер телефону</label>
                            <input className="input-left-post" type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                style={{ borderColor: phoneBorderColor }}
                            />
                            {phoneBorderColor === "red" &&
                                <label className="error-message">
                                    <ErrorIcon />
                                    Некоректний номер телефону
                                </label>}
                        </div>

                        <div className="left-pswrd">
                            <label className="text-left-pswrd">Пароль</label>
                            <PasswordInput onChange={handlePasswordChange} />
                            {passwordBorderColor === "red" &&
                                <label className="error-message">
                                    <ErrorIcon />
                                    Введіть пароль
                                </label>}
                        </div>

                        <div>
                            <a href='/change-password' className='text-left-forgot'>Забули пароль?</a>
                        </div>

                        <div className='div-enter-button'>
                            <button
                                className='enter-button'
                                onClick={handleEnter}
                            >Увійти</button>
                        </div>

                        <div className='div-register-button'>
                            <Link to='/register' className='register-button'>Зареєструватися</Link>
                        </div>

                    </div>

                    <div className="vertical-line">
                        <VerticalLine />
                    </div>

                    <div className="enter-body-foot-right">
                        <label className='text-right-enter'>Увійти як користувач</label>
                        <div className='icons-right-enter'>
                            <div className='google-right-enter'>
                                <button
                                    className="google-button"
                                    onClick={googleLogin}
                                >
                                    <GoogleIcon />
                                </button>
                                <label className='label-google'>Google</label>
                            </div>
                            <div className='facebook-right-enter'>
                                <button
                                    className="facebook-button"
                                    onClick={handleFacebook}
                                >
                                    <FacebookIcon />
                                </button>
                                <label className='label-facebook'>Facebook</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLoginForm;