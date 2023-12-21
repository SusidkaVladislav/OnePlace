import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import jwt from 'jwt-decode'
import { instance } from "../../../../api.config.js";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    errorFromServer: false,
    messageFromServer: '',
    userLoginLoading: false,
    loginServerConnectionError: false,
}

export const userLogin = createAsyncThunk('user/userLogin', async (login, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + "/Account/login", login, {
            withCredentials: true
        })
        return response.data;
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
        if (error.response.status === 400)
        {
            const customError = {
                status: error.response.data.status,
                message: error.response.data.title,
                detail: error.response.data.title,
            };
            return rejectWithValue(customError)
        }
        const customError = {
            status: error.response.data.status,
            message: error.response.data.title,
            detail: error.response.data.detail,
        };
        return rejectWithValue(customError)
    }
})

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        removeError: (state) =>
        {
            return {
                ...state,
                error: false,
            }
        },
        resetLoginServerConnectionError: (state) =>
        {
            return {
                ...state,
                loginServerConnectionError: false,
            }
        },
    },
    extraReducers(builder)
    {
        builder
            .addCase(userLogin.pending, (state) =>
            {
                return {
                    ...state,
                    messageFromServer: '',
                    errorFromServer: false,
                    userLoginLoading: true,
                }
            })
            .addCase(userLogin.fulfilled, (state, { payload }) =>
            {
                const user = jwt(payload);
                const role = user["Role"];
                let isInRole = role === 'user' ? false : true;
                if (isInRole)
                {
                    return {
                        ...state,
                        errorFromServer: isInRole,
                        messageFromServer: 'Невіний логін або пароль'
                    }
                }
                localStorage.setItem("access-token", payload);
                return {
                    ...state,
                    errorFromServer: isInRole,
                    messageFromServer: '',
                    userLoginLoading: false,
                }

            })
            .addCase(userLogin.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                localStorage.removeItem("access-token");

                return {
                    ...state,
                    errorFromServer: true,
                    userLoginLoading: false,
                    messageFromServer: payload.detail,
                    loginServerConnectionError: isServerConnectionError,
                }
            })
    }
})

export const {
    removeError,
    resetLoginServerConnectionError,
} = userLoginSlice.actions;

export default userLoginSlice.reducer