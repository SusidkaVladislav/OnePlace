import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]+$/;

const initialState = {
    password: '',
    confirmPassword: '',
    errorMessage: '',
    errorMatch: true,
    hasErrors: true,
}


const passwordInputSlice = createSlice({
    name: 'passwordInputState',
    initialState,
    reducers: {

        setPassword: (state, { payload }) =>
        {
            state.password = payload;
        },

        setConfirmPassword: (state, { payload }) =>
        {
            state.confirmPassword = payload;
        },

        isPasswordStrong: (state) =>
        {
            if (state.password.length < MIN_PASSWORD_LENGTH)
            {
                state.errorMessage = `Пароль повинен містити мінімум ${MIN_PASSWORD_LENGTH} символів`;
                state.hasErrors = true;
            }
            else if (!PASSWORD_PATTERN.test(state.password))
            {
                state.errorMessage = `Пароль повинен містити мінімум одну велику літеру, одну маленьку літеру, одну цифру та один спеціальний символ`;
                state.hasErrors = true;
            }
            else
            {
                state.errorMessage = '';
                state.hasErrors = false;
            }
        },

        isMatched: (state) =>
        {
            if ((state.password === state.confirmPassword) && !state.hasErrors) 
            {
                state.errorMatch = false;
            }
            else
            {
                state.errorMatch = true;
            }
        },

        resetPasswordState: (state) =>
        {
            state.password = '';
            state.confirmPassword = '';
            state.errorMessage = '';
            state.errorMatch = true;
            state.hasErrors = true;
        },

    },
})

export const { setPassword, setConfirmPassword, isPasswordStrong, isMatched, resetPasswordState } = passwordInputSlice.actions;

export default passwordInputSlice.reducer