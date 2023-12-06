import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../../../../api.config.js";
const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    isLoginFormOpen: false,
    isRegisterFormOpen: false,
    isRenewPasswordFormOpen: false,

    isAuthState: false,
    beforeAuthPath: '',

    loading: false,
    userPersonalData: {},
}

export const getUserPersonalData = createAsyncThunk('user/getUserPersonalData', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/User/getUserPersonalData');
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

export const refreshToken = createAsyncThunk('user/refreshToken', async (_, { rejectWithValue }) =>
{
    try
    {
        const accessToken = localStorage.getItem("access-token");

        const resp = await axios.post(
            `${REACT_APP_BASE_URL}/Account/refresh`,
            null,
            {
                params: {
                    accessToken: accessToken,
                },
                withCredentials: true,
            }
        );

        localStorage.setItem("access-token", resp.data);
    }
    catch (err)
    {

    }
})

const userAuthSlice = createSlice({
    name: 'userAuthState',
    initialState,
    reducers: {
        setIsLoginFormOpen: (state, { payload }) =>
        {
            return {
                ...state,
                isLoginFormOpen: payload
            }
        },
        setIsRegisterFormOpen: (state, { payload }) =>
        {
            return {
                ...state,
                isRegisterFormOpen: payload
            }
        },
        setIsRenewPasswordFormOpen: (state, { payload }) =>
        {
            return {
                ...state,
                isRenewPasswordFormOpen: payload
            }
        },
        setIsAuthState: (state, { payload }) =>
        {
            return {
                ...state,
                isAuthState: payload,
            }
        },
        setBeforeAuthPath: (state, { payload }) =>
        {
            return {
                ...state,
                beforeAuthPath: payload
            }
        },
    },
    extraReducers(builder)
    {
        builder
            .addCase(getUserPersonalData.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getUserPersonalData.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                    userPersonalData: payload.data,
                }
            })
            .addCase(getUserPersonalData.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                }
            })
    }
})

export const {
    setIsLoginFormOpen,
    setIsRegisterFormOpen,
    setIsRenewPasswordFormOpen,

    setIsAuthState,
    setBeforeAuthPath,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;