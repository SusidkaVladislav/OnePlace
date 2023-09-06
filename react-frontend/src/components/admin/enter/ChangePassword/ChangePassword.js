import React, { useState } from 'react';
import "./ChangePasswordStyle.css";
import OnePlaceIcon from "../Login/svg/OnePlaceIcon";   
import ErrorIcon from '../Login/svg/ErrorIcon';
import EyeIcon from '../Login/svg/EyeIcon';
import NotEyeIcon from '../Login/svg/NotEyeIcon';

const ChangePassword=()=> {
    const MIN_PASSWORD_LENGTH = 8;
    const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]+$/;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorMessagePasswordConfirm, setErrorMessagePasswordConfirm] = useState('');

    const [EmailErrorIcon, setEmailErrorIcon] = useState(false);
    const [PasswordErrorIcon, setPasswordErrorIcon] = useState(false);
    const [PasswordConfirmErrorIcon, setPasswordConfirmErrorIcon] = useState(false);

    const [EmailBorderColor, setEmailBorderColor] = useState('');
    const [PasswordBorderColor, setPasswordBorderColor] = useState('');
    const [PasswordConfirmBorderColor, setPasswordConfirmBorderColor] = useState('');
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    
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
    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
        setPasswordConfirmErrorIcon(false);
        setPasswordConfirmBorderColor('');
        setErrorMessagePasswordConfirm('');
    };

    const handleConfirmAccess=()=>{
        setIsConfirmDialogVisible(false);
        window.location.href = `/login`;
    }

    const handleConfirm =async (event) => {
        event.preventDefault();
        let isCorrect=0;

        if(email.length===0)
        {
            setErrorMessageEmail('Введіть електронну пошту');
            setEmailErrorIcon(true);
            setEmailBorderColor('red');
        }
        else{
            setErrorMessageEmail('');
            setEmailErrorIcon(false);
            setEmailBorderColor('');
            isCorrect++;
        }

        if(password.length===0)
        {
            setErrorMessagePassword('Невірний пароль');
            setPasswordErrorIcon(true);
            setPasswordBorderColor('red');
        }
        else{
            if (password.length < MIN_PASSWORD_LENGTH) {
                setErrorMessagePassword(`Пароль повинен містити мінімум ${MIN_PASSWORD_LENGTH} символів`);
                setPasswordErrorIcon(true);
                setPasswordBorderColor('red');
            } else if (!PASSWORD_PATTERN.test(password)) {
                setErrorMessagePassword('Пароль повинен містити мінімум одну велику літеру, одну маленьку літеру, одну цифру та один спеціальний символ');
                setPasswordErrorIcon(true);
                setPasswordBorderColor('red');
            } else {
                setErrorMessagePassword('');
                setPasswordErrorIcon(false);
                setPasswordBorderColor('');
                isCorrect++;
            }
        }
        if (password !== passwordConfirm) {
            setErrorMessagePasswordConfirm('Паролі не співпадають');
            setPasswordConfirmErrorIcon(true);
            setPasswordConfirmBorderColor('red');
        } else {
            setErrorMessagePasswordConfirm('');
            setPasswordConfirmErrorIcon(false);
            setPasswordConfirmBorderColor('');
            isCorrect++;
        }

        if(isCorrect===3)
        {
            const response = await fetch("https://localhost:7052/api/Account/changePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password}),
            });
            if (response.ok) {
                setIsConfirmDialogVisible(true);
            } else {
                if(response.status===441)
                {
                    setErrorMessageEmail('Користувача не знайдено');
                    setEmailErrorIcon(true);
                    setEmailBorderColor('red');
                }
                if(response.status===440)
                {
                    setErrorMessageEmail('Зміна паролю неможлива');
                    setEmailErrorIcon(true);
                    setEmailBorderColor('red');
                }
            }
        }

    }


    return(
        <div className='change-body'>
            <div className='change-div'>
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
                        <label className="text-change-post">Новий пароль</label>
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
                    <div className="left-post">
                        <label className="text-change-post">Підтвердіть новий пароль</label>
                        <input className="input-change-post" type={showPassword2 ? 'text' : 'password'} 
                            value={passwordConfirm} 
                            onChange={handlePasswordConfirmChange}
                            style={{borderColor:PasswordConfirmBorderColor}} />
                            <label className="change-eye-button" onClick={() => setShowPassword2(!showPassword2)}>
                                {showPassword2 ? <NotEyeIcon /> : <EyeIcon />}
                            </label>
                        {PasswordConfirmErrorIcon && <label className='error-icon-email'><ErrorIcon/></label>}
                    </div>
                    <div className='error-email'>
                        {errorMessagePasswordConfirm && <label className="error-message">{errorMessagePasswordConfirm}</label>}
                    </div>
                    <div className='change-button'>
                        <button className='confirm-button' onClick={handleConfirm}>Підтвердити</button>
                    </div>
                </div>
            </div>
            {isConfirmDialogVisible && (
              <div className='modal-backdrop'>
                <div className='confirm-dialog'>
                  <p>Пароль успішно змінено, пройдіть авторизацію</p>
                  <label className='confirm-buttom' onClick={handleConfirmAccess}>Ok</label>
                </div>
              </div>
            )}
        </div>
    )

}

export default ChangePassword;