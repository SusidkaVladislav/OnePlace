import React, { useState } from 'react';
import './PasswordInputStyle.css';

import { useSelector } from 'react-redux';

const PasswordInput = (props) =>
{
    const {
        onChange
    } = props;

    const { hasErrors, errorMatch, errorMessage } = useSelector(state => state.passwordInputState);

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (event) =>
    {
        onChange(event.target.value);
    }

    return (
        <div className="input-wrapper">
            <input className="input-text-form" type={showPassword ? 'text' : 'password'}
                onChange={handlePasswordChange}
                style={
                    (hasErrors || errorMatch) && errorMessage.length > 0?
                        { borderColor: 'red' }
                        :
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
    )
}

export default PasswordInput;