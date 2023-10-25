import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdminCredentials } from "./adminAuthSlice";
import { Link, useNavigate } from "react-router-dom";

//#region Styles
import './AuthStyles.css';
import './adminLoginStyle.css';
//#endregion

//#region Icons
import OnePlaceIcon from '../../svg/loginIcons/OnePlaceIcon';
import ErrorIcon from '../../svg/loginIcons/ErrorIcon';
import OnePlaceIcon2 from '../../svg/loginIcons/OnePlaceIcon2';
import HelloIcon from '../../svg/loginIcons/HelloIcon';
//#endregion


import { setPassword } from '../servicesState/passwordState';

import PasswordInput from "../../../../services/passwordInputs/PasswordInput";


//Тут треба обробити логіку входу і обробку помилок


const AdminAuthForm = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const adminCredentials = useSelector(getAdminCredentials);
    const { password } = useSelector(state => state.passwordInputState)

    const [email, setEmail] = useState("");



    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [EmailErrorIcon, setEmailErrorIcon] = useState(false);
    const [PasswordErrorIcon, setPasswordErrorIcon] = useState(false);
    const [EmailBorderColor, setEmailBorderColor] = useState('');
    const [PasswordBorderColor, setPasswordBorderColor] = useState('');

    const handleEmailChange = (event) =>
    {
        setEmail(event.target.value);
        setEmailErrorIcon(false);
        setEmailBorderColor('');
        setErrorMessageEmail('');
    };

    const handlePasswordChange = (password) =>
    {
        dispatch(setPassword(password));

    };

    const handleEnter = async (event) =>
    {

        //navigate('main');
        //try
        //{
        const rememberMe = true;
        await dispatch(adminLogin(({ email, password, rememberMe })))
        navigate('main');
        //if (adminCredentials.isAuth === true)
        //console.log("isAuth is true")

        // } catch (err)
        // {
        //     console.error('Failed to save the post', err)
        // }
        // finally
        // {
        //     //console.log(adminCredentials);
        // }
    }

    return (
        <div className='change-body'>
            <div className='change-div'>
                <OnePlaceIcon />

                <div className='change-body-div'>
                    <div className="left-post">
                        <label className="label-form">Пошта</label>
                        <div className="input-wrapper">
                            <input
                                className="input-text-form"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                style={{ borderColor: EmailBorderColor }} />

                            {EmailErrorIcon && <span className="error-icon-email"></span>}
                        </div>

                    </div>

                    <div className='error-email'>
                        {errorMessageEmail && <label className="error-message">{errorMessageEmail}</label>}
                    </div>

                    <div className="left-post">
                        <label className="label-form">Пароль</label>

                        <PasswordInput onChange={handlePasswordChange} />

                        {PasswordErrorIcon && <label className='error-icon-email'><ErrorIcon /></label>}
                    </div>

                    <div className='change-error-email'>
                        {errorMessagePassword && <label className="change-error-message">{errorMessagePassword}</label>}
                    </div>


                    <button className='confirm-button' onClick={handleEnter}>Увійти</button>


                    <div className='admin-left-forgot'>
                        <Link to='/change-password' className='admin-forgot'>Забули пароль?</Link>
                    </div>
                </div>
            </div>

            <div className='hello-icon'>
                <HelloIcon />
            </div>
            <div className='oneplace-icon'>
                <OnePlaceIcon2 />
            </div>


        </div>
    )
}

export default AdminAuthForm