import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]+$/;
const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_PATTERN = /^\d*$/;
const PHONE_PREFIX = '380';

const initialState = {
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
    isAgree: false,

    nameError: {
        isError: false,
        message: ''
    },
    surnameError: {
        isError: false,
        message: ''
    },
    emailError: {
        isError: false,
        message: ''
    },
    phoneNumberError: {
        isError: false,
        message: ''
    },
    passwordError: {
        isError: false,
        message: ''
    },
    isAgreeError: {
        isError: false,
        message: ''
    },

    isReadyToServer: false,
    errorFromServer: false,
    messageFromServer: '',
}

export const registerUser = createAsyncThunk('user/registerUser', async (arg, { getState, dispatch, rejectWithValue }) =>
{
    await dispatch(verifyState());

    const state = getState();
    const { isReadyToServer, name, surname, email, phoneNumber, password } = state.userRegister;

    if (isReadyToServer)
    {
        const registerPayload = {
            Name: name,
            Surname: surname,
            Email: email,
            PhoneNumber: phoneNumber,
            Password: PHONE_PREFIX + password
        }

        try
        {
            const response = await axios.post(REACT_APP_BASE_URL + '/Account/register', registerPayload);
            return response;
        }
        catch (error)
        {
            if (error.code === 'ERR_NETWORK')
            {
                const customError = {
                    status: 500,
                    message: "Відсутнє з'єднання",
                    detail: 'Немає підключення до серверу',
                };

                return rejectWithValue(customError);
            }

            const customError = {
                status: error.response.data.status,
                message: error.response.data.title,
                detail: error.response.data.detail,
            };

            return rejectWithValue(customError)
        }
    }
    else
    {
        throw new Error('Некоректні дані')
    }
});

const userRegisterSlice = createSlice({
    name: 'userRegisterState',
    initialState,
    reducers: {
        setName: (state, { payload }) =>
        {
            return {
                ...state,
                name: payload,
            };
        },
        setSurname: (state, { payload }) =>
        {
            return {
                ...state,
                surname: payload,
            };
        },
        setEmail: (state, { payload }) =>
        {
            return {
                ...state,
                email: payload,
            };
        },
        setPhoneNumber: (state, { payload }) =>
        {
            if (PHONE_PATTERN.test(payload) && payload.length <= 9)
            {
                return {
                    ...state,
                    phoneNumber: payload,
                };
            }
        },
        setPassword: (state, { payload }) =>
        {
            return {
                ...state,
                password: payload,
            };
        },
        setIsAgree: (state, { payload }) =>
        {
            return {
                ...state,
                isAgree: payload,
            };
        },
        verifyState: (state) => 
        {
            const newState = { ...state };

            if (newState.name.length < 1)
            {
                newState.nameError = {
                    isError: true,
                    message: "Введіть своє ім'я",
                };
            } else
            {
                newState.nameError = {
                    isError: false,
                    message: "",
                };
            }

            if (newState.surname.length < 1)
            {
                newState.surnameError = {
                    isError: true,
                    message: "Введіть своє прізвище",
                };
            } else
            {
                newState.surnameError = {
                    isError: false,
                    message: "",
                };
            }

            if (newState.email.length < 1)
            {
                newState.emailError = {
                    isError: true,
                    message: "Введіть пошту",
                };
            } else if (!EMAIL_PATTERN.test(newState.email))
            {
                newState.emailError = {
                    isError: true,
                    message: "Пошту введено некоректно",
                };
            } else
            {
                newState.emailError = {
                    isError: false,
                    message: "",
                };
            }

            if (newState.phoneNumber.length < 9)
            {
                newState.phoneNumberError = {
                    isError: true,
                    message: "Введіть номер телефону",
                };
            } else
            {
                newState.phoneNumberError = {
                    isError: false,
                    message: "",
                };
            }

            if (newState.password.length < MIN_PASSWORD_LENGTH)
            {
                newState.passwordError = {
                    isError: true,
                    message: `Пароль повинен містити мінімум ${MIN_PASSWORD_LENGTH} символів`,
                };
            } else if (!PASSWORD_PATTERN.test(newState.password))
            {
                newState.passwordError = {
                    isError: true,
                    message: "Пароль повинен містити мінімум одну велику літеру, одну маленьку літеру, одну цифру та один спеціальний символ",
                };
            } else
            {
                newState.passwordError = {
                    isError: false,
                    message: "",
                };
            }

            if (!newState.isAgree)
            {
                newState.isAgreeError = {
                    isError: true,
                    message: "Ви не погодилися на використання даних",
                };
            } else
            {
                newState.isAgreeError = {
                    isError: false,
                    message: "",
                };
            }

            newState.isReadyToServer = !(
                newState.nameError.isError ||
                newState.surnameError.isError ||
                newState.emailError.isError ||
                newState.phoneNumberError.isError ||
                newState.passwordError.isError ||
                newState.isAgreeError.isError
            );

            return newState;
        },
        reset: (state) =>
        {
            state.name = '';
            state.surname = '';
            state.email = '';
            state.phoneNumber = '';
            state.password = '';
            state.isAgree = false;
            state.nameError = {
                isError: false,
                message: ''
            };
            state.surnameError = {
                isError: false,
                message: ''
            };
            state.emailError = {
                isError: false,
                message: ''
            };
            state.phoneNumberError = {
                isError: false,
                message: ''
            };
            state.passwordError = {
                isError: false,
                message: ''
            };
            state.isAgreeError = {
                isError: false,
                message: ''
            };

            state.isReadyToServer = false;
            state.errorFromServer = false;
            state.messageFromServer = '';
        }


    },
    extraReducers(builder)
    {
        builder
            .addCase(registerUser.fulfilled, (state) =>
            {
                return {
                    ...state,
                    messageFromServer: 'Успішно зареєстровано',
                    errorFromServer: false,
                }
            })
            .addCase(registerUser.rejected, (state, action) =>
            {
                return {
                    ...state,
                    errorFromServer: true,
                    messageFromServer: action.payload.detail,
                }
            })
    }
})

export const { setName, setSurname, setEmail, setPhoneNumber, setPassword, verifyState, setIsAgree, reset } = userRegisterSlice.actions;

export default userRegisterSlice.reducer