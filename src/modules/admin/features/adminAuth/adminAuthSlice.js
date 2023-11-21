import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import jwt from 'jwt-decode'
import { instance } from "../../../../api.config.js";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    error: false
}


export const adminLogin = createAsyncThunk('admin/adminLogin', async (login, { rejectWithValue }) =>
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

export const admiLogout = createAsyncThunk('admin/adminLogout', async (email, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + "/Account/logout", email, {
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

const adminAuthSlice = createSlice({
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

    },
    extraReducers(builder)
    {
        builder
            .addCase(adminLogin.pending, (state, action) =>
            {
                return {
                    ...state,
                    error: false,
                }
            })
            .addCase(adminLogin.fulfilled, (state, { payload }) =>
            {
                localStorage.setItem("token", payload);
                const user = jwt(payload);
                const role = user["Role"];
                let isInRole = role === 'admin' ? false : true;
                return {
                    ...state,
                    error: isInRole,
                }
            })
            .addCase(adminLogin.rejected, (state) =>
            {
                localStorage.removeItem("token");
                return {
                    ...state,
                    error: true,
                }
            })
    }
})

export const {
    removeError
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer