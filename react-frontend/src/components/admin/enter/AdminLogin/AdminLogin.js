import React, { useState } from 'react';
import "./AdminLoginStyle.css";
import OnePlaceIcon from "../Login/svg/OnePlaceIcon";   
import ErrorIcon from '../Login/svg/ErrorIcon';
import EyeIcon from '../Login/svg/EyeIcon';
import NotEyeIcon from '../Login/svg/NotEyeIcon';
import OnePlaceIcon2 from '../Login/svg/OnePlaceIcon2';
import HelloIcon from '../Login/svg/HelloIcon';

const AdminLogin=()=> {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');

    const [EmailErrorIcon, setEmailErrorIcon] = useState(false);
    const [PasswordErrorIcon, setPasswordErrorIcon] = useState(false);

    const [EmailBorderColor, setEmailBorderColor] = useState('');
    const [PasswordBorderColor, setPasswordBorderColor] = useState('');
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailErrorIcon(false);
        setEmailBorderColor('');
        setErrorMessageEmail('');
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordErrorIcon(false);
        setPasswordBorderColor('');
        setErrorMessagePassword('');
    };

    const handleEnter =async (event) => {
        event.preventDefault();

        const response = await fetch("https://localhost:7052/api/Account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const result = await response.json();

            setPasswordErrorIcon(false);
            setEmailErrorIcon(false);
            setEmailBorderColor('');
            setPasswordBorderColor('');
            setErrorMessageEmail('');
            setErrorMessagePassword('');
            //?email=${result.data.Email}&name=${result.data.Name}&surname=${result.data.Surname}
            window.location.href = `/admin/main`;

        }
        else{
            if(password.length===0&&email.length===0)
            {
                setErrorMessageEmail('Введіть пошту.');
                setErrorMessagePassword('Введіть пароль.');
                setPasswordErrorIcon(true);
                setEmailErrorIcon(true);
                setEmailBorderColor('red');
                setPasswordBorderColor('red');
            }

            if(response.status===401)
            {
                setErrorMessageEmail('Користувач з такою поштою не знайдений.');
                setErrorMessagePassword('');
                setPasswordErrorIcon(false);
                setEmailErrorIcon(true);
                setEmailBorderColor('red');
                setPasswordBorderColor('');
            }
            if(response.status===411)
            {
                setErrorMessagePassword('Невірний пароль.');
                setErrorMessageEmail('');
                setPasswordErrorIcon(true);
                setEmailErrorIcon(false);
                setEmailBorderColor('');
                setPasswordBorderColor('red');
            }
            if(response.status===421)
            {
                setErrorMessageEmail('Доступ тільки для адміністраторів');
                setErrorMessagePassword('');
                setPasswordErrorIcon(false);
                setEmailErrorIcon(true);
                setEmailBorderColor('red');
                setPasswordBorderColor('');
            }

        }
        
    }


    return(
        <div className='change-body'>
            <div className='change-admin-div'>
                <div className='change-icon'>
                    <OnePlaceIcon/>
                </div>
                <div className='change-body-div'>
                    <div className="left-post">
                        <label className="text-change-post">Ел.пошта</label>
                        <input className="input-change-post" type="email" 
                            value={email} 
                            onChange={handleEmailChange}
                            style={{borderColor:EmailBorderColor}} />
                        {EmailErrorIcon && <label className='error-icon-email'><ErrorIcon/></label>}
                    </div>
                    <div className='error-email'>
                        {errorMessageEmail && <label className="error-message">{errorMessageEmail}</label>}
                    </div>
                    <div className="left-post">
                        <label className="text-change-post">Пароль</label>
                        <input className="input-change-post" type={showPassword ? 'text' : 'password'} 
                            value={password} 
                            onChange={handlePasswordChange}
                            style={{borderColor:PasswordBorderColor}} />
                            <label className="change-eye-button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <NotEyeIcon /> : <EyeIcon />}
                            </label>
                        {PasswordErrorIcon && <label className='error-icon-email'><ErrorIcon/></label>}
                    </div>
                    <div className='change-error-email'>
                        {errorMessagePassword && <label className="change-error-message">{errorMessagePassword}</label>}
                    </div>
                    
                    <div className='change-button'>
                        <button className='confirm-button' onClick={handleEnter}>Увійти</button>
                    </div>
                    <div className='admin-left-forgot'>
                        <a href='/change-password' className='admin-forgot'>Забули пароль?</a>
                    </div>
                </div>
            </div>
            <div className='hello-icon'>
                <HelloIcon/>
            </div>
            <div className='oneplace-icon'>
                <OnePlaceIcon2/>
            </div>
        </div>
    )

}

export default AdminLogin;