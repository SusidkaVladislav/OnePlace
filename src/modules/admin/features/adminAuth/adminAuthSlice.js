import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import jwt from 'jwt-decode'
import { instance } from "../../../../api.config.js";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    admin: {},
    isAuth: false,
    isAuthInProgress: false,
    role: '',
    error: null
}


export const adminLogin = createAsyncThunk('admin/adminLogin', async (login, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + "/Account/login", login)
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
    name: 'adminAuth',
    initialState,
    reducers: {},
    extraReducers(builder)
    {
        builder
            .addCase(adminLogin.pending, (state, action) =>
            {
                return {
                    ...state,
                    isAuthInProgress: true,
                }
            })
            .addCase(adminLogin.fulfilled, (state, action) =>
            {
                localStorage.setItem("token", action.payload);
                
                const user = jwt(action.payload);
                const role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

                return {
                    ...state,
                    isAuth: true,
                    isAuthInProgress: false,
                    role: role,
                }
            })
            .addCase(adminLogin.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    isAuth: false,
                    isAuthInProgress: false,
                }
            })

        // .addCase(adminLogin.rejected, (state, action) =>
        // {
        //     //state.error = action.error.message
        //     state.admin = { email: "failAdminEmail", password: "failAdminPassword" };
        //     state.error = "server error";
        // })
        // .addCase(HttpStatusCode.BadRequest, (state, action) =>
        // {
        //     //state.error = action.error.message
        //     state.admin = { email: "failAdminEmail", password: "failAdminPassword" };
        //     state.error = "server error";
        // })
    }
})


export const getAdminCredentials = (state) => state.admin;

export default adminAuthSlice.reducer