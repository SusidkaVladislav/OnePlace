import React, { useState } from 'react';
import './PasswordInputStyle.css';
import ErrorInputIcon from '../../svg/login-icons/ErrorInputIcon';

import { useSelector } from 'react-redux';

const PasswordInput = (props) =>
{
    const {
        onChange,
        isError
    } = props;

    const { hasErrors, errorMatch, errorMessage } = useSelector(state => state.passwordInputState);

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (event) =>
    {
        onChange(event.target.value);
    }

    return (
        <div
            className="input-wrapper">
            <input className="login-user-text-input" type={showPassword ? 'text' : 'password'}
                onChange={handlePasswordChange}
                style={
                    ((hasErrors || errorMatch) && errorMessage.length > 0) || isError ?
                        { border: '1px solid red' }
                        :
                        { borderColor: 'black' }
                }
            />
            {isError && <label className='pass-error-icon'><ErrorInputIcon /></label>}
            {showPassword ? (
                <span
                    className="eye-icon-password eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                ></span>
            ) : (

                <span
                    className="no-eye-icon-password eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                ></span>
            )}

        </div>
    )
}

export default PasswordInput;