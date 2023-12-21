import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    errorFromServer: false,
    messageFromServer: '',

    registerUserLoading: false,
    registerServerConnectionError: false,
}

export const registerUser = createAsyncThunk('user/registerUser', async (register, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.post(REACT_APP_BASE_URL + '/Account/register', register, {
            withCredentials: true
        });
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
});

const userRegisterSlice = createSlice({
    name: 'userRegisterState',
    initialState,
    reducers: {
        resetState: (state) =>
        {
            return {
                ...state,
                messageFromServer: '',
                errorFromServer: false,
            }
        },
        resetRegisterServerConnectionError: (state) =>
        {
            return {
                ...state,
                registerServerConnectionError: false,
            }
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(registerUser.pending, (state) =>
            {
                return {
                    ...state,
                    registerUserLoading: true,
                }
            })
            .addCase(registerUser.fulfilled, (state) =>
            {
                return {
                    ...state,
                    messageFromServer: 'Успішно зареєстровано!',
                    errorFromServer: false,
                    registerUserLoading: false,
                }
            })
            .addCase(registerUser.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    errorFromServer: true,
                    messageFromServer: payload.detail,
                    registerUserLoading: false,
                    registerServerConnectionError: isServerConnectionError,
                }
            })
    }
})

export const {
    resetState,
    resetRegisterServerConnectionError,
} = userRegisterSlice.actions;

export default userRegisterSlice.reducer