import React, { useState,useEffect } from 'react';
import './LoginStyle.css';
import CrossIcon from "./svg/CrossIcon";
import EyeIcon from './svg/EyeIcon';
import GoogleIcon from './svg/GoogleIcon';
import FacebookIcon from './svg/FacebookIcon';
import NotEyeIcon from './svg/NotEyeIcon';
import ErrorIcon from './svg/ErrorIcon';
import VerticalLine from './svg/VerticalLine';

const Login= ()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePswrd, setErrorMessagePswrd] = useState('');
    const [EmailErrorIcon, setEmailErrorIcon] = useState(false);
    const [PswrdErrorIcon, setPswrdErrorIcon] = useState(false);
    const [EmailBorderColor, setEmailBorderColor] = useState('');
    const [PswrdBorderColor, setPswrdBorderColor] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailErrorIcon(false);
        setEmailBorderColor('');
        setErrorMessageEmail('');
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPswrdErrorIcon(false);
        setPswrdBorderColor('');
        setErrorMessagePswrd('');
    };
    const handleClose = async () => {};
    const handleEnter =async (event) => {
        event.preventDefault();

        const response = await fetch("https://localhost:44394/api/Account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const result = await response.json();

            setPswrdErrorIcon(false);
            setEmailErrorIcon(false);
            setEmailBorderColor('');
            setPswrdBorderColor('');
            setErrorMessageEmail('');
            setErrorMessagePswrd('');
            window.location.href = `/admin/main?email=${result.data.Email}&name=${result.data.Name}&surname=${result.data.Surname}`;

        }
        else
        {
            if(password.length===0&&email.length===0)
            {
                setErrorMessageEmail('Введіть пошту.');
                setErrorMessagePswrd('Введіть пароль.');
                setPswrdErrorIcon(true);
                setEmailErrorIcon(true);
                setEmailBorderColor('red');
                setPswrdBorderColor('red');
            }
            if(response.status===401)
            {
                setErrorMessageEmail('Користувач з такою поштою не знайдений.');
                setErrorMessagePswrd('');
                setPswrdErrorIcon(false);
                setEmailErrorIcon(true);
                setEmailBorderColor('red');
                setPswrdBorderColor('');
            }
            if(response.status===411)
            {
                setErrorMessagePswrd('Невірний пароль.');
                setErrorMessageEmail('');
                setPswrdErrorIcon(true);
                setEmailErrorIcon(false);
                setEmailBorderColor('');
                setPswrdBorderColor('red');
            }
        }
       
    };
    const handleGoogle = async () => {
    };
    const handleFacebook = async () => {
    };


    useEffect(() => {}, [email,password]);
    return(
        
        <div className="enter-body">
            <div className="enter-body-cart">
                <div className="enter-body-head">
                    <h2 className="enter-body-head-text">Вхід</h2>
                    <button className="cross-button" onClick={handleClose}>
                        <CrossIcon/>
                    </button>
                </div>
                <div className="enter-body-foot">
                    <div className="enter-body-foot-left">
                        <div className="left-post">
                            <label className="text-left-post">Пошта або телефон</label>
                            <input className="input-left-post" type="email" 
                                value={email} 
                                onChange={handleEmailChange}
                                style={{borderColor:EmailBorderColor}} />
                                {EmailErrorIcon && <label className='error-icon-email'><ErrorIcon/></label>}
                        </div>
                        <div className='error-email'>
                            {errorMessageEmail && <label className="error-message">{errorMessageEmail}</label>}
                        </div>
                        <div className="left-pswrd">
                            <label className="text-left-pswrd">Пароль</label>
                            <input className="input-left-pswrd" type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    style={{borderColor:PswrdBorderColor}} />
                            <button className="eye-button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <NotEyeIcon /> : <EyeIcon />}
                            </button>
                            {PswrdErrorIcon && <label className='error-icon-pswrd'><ErrorIcon/></label>}
                            
                        </div>
                        <div className='error-pswrd'>
                            {errorMessagePswrd && <label className="error-message">{errorMessagePswrd}</label>}
                        </div>
                        <div>
                            <a href='/change-password' className='text-left-forgot'>Забули пароль?</a>
                        </div>
                        <div className='div-enter-button'>
                            <button className='enter-button' onClick={handleEnter}>Увійти</button>
                        </div>
                        <div className='div-register-button'>
                            <a href='/register' className='register-button'>Зареєструватися</a>
                        </div>
                    </div>
                    <div className="vertical-line">
                        <VerticalLine />
                    </div>
                    <div className="enter-body-foot-right">
                        <label className='text-right-enter'>Увійти як користувач</label>
                        <div className='icons-right-enter'>
                            <div className='google-right-enter'>
                                <button className="google-button" onClick={handleGoogle}>
                                    <GoogleIcon/>
                                </button>
                                <label className='label-google'>Google</label>
                            </div>
                            <div className='facebook-right-enter'>
                                <button className="facebook-button" onClick={handleFacebook}>
                                    <FacebookIcon/>
                                </button>
                                <label className='label-facebook'>Facebook</label>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

};

export default Login
