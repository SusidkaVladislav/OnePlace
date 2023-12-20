import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "./adminAuthSlice";
import { Link, useNavigate } from "react-router-dom";

//#region Styles
import './AuthStyles.css';
import './adminLoginStyle.css';
//#endregion

//#region Icons
import OnePlaceIcon from '../../../../svg/login-icons/OnePlaceIcon';
import OnePlaceIcon2 from '../../../../svg/login-icons/OnePlaceIcon2';
import AdminLoginBackground1 from '../../../../svg/login-icons/AdminLoginBackground1';
//#endregion


import { setPassword } from '../servicesState/passwordState';
import PasswordInput from "../../../../services/passwordInputs/PasswordInput";
import LoadingAnimation from '../../../../common-elements/loading/LoadingAnimation';


const AdminAuthForm = () =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { password } = useSelector(state => state.passwordInputState)
    const {
        error,
        loadingAdminLogin, } = useSelector(state => state.adminAuth)

    const [email, setEmail] = useState(localStorage.getItem("email") !== 'null' ? localStorage.getItem("email") : '');
    const [loginError, setLoginError] = useState(error);

    const handleEmailChange = (event) =>
    {
        setLoginError(false);
        setEmail(event.target.value);
    };

    const handlePasswordChange = (password) =>
    {
        setLoginError(false);
        dispatch(setPassword(password));
    };

    const handleEnter = async () =>
    {
        localStorage.setItem("email", email)
        if (email !== null && password !== null)
            await dispatch(adminLogin(({ email, password })))

        navigate('main');
    }

    if (loadingAdminLogin)
    {
        return <LoadingAnimation />
    }
    return (

        <div className='admin-login-container'>

            <OnePlaceIcon />

            {loginError ? <label className="login-error-message">*Неправильний логін або пароль</label> : <label className="login-error-message"></label>}

            <div className='login-admin-form'>

                <div>
                    <label className="label-form">Пошта</label>
                    <div className="input-wrapper">
                        <input
                            className="input-admin-login"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            style={{ border: loginError ? '1px solid red' : 'none' }} />

                        {loginError && <span className="error-icon-email"></span>}
                    </div>
                </div>

                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <label className="label-form">Пароль</label>
                    <PasswordInput isError={loginError} onChange={handlePasswordChange} />
                </div>

                <span>
                    <button className='confirm-button' onClick={handleEnter}>Увійти</button>
                </span>

            </div>

            <div className='hello-icon'>
                <AdminLoginBackground1 />
            </div>
            <div className='oneplace-icon'>
                <OnePlaceIcon2 />
            </div>
        </div>
    )
}

export default AdminAuthForm