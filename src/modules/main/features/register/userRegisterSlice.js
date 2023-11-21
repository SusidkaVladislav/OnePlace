import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    errorFromServer: false,
    messageFromServer: '',
}

export const registerUser = createAsyncThunk('user/registerUser', async (register, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.post(REACT_APP_BASE_URL + '/Account/register', register);
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
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(registerUser.fulfilled, (state) =>
            {
                return {
                    ...state,
                    messageFromServer: 'Успішно зареєстровано!',
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

export const {
    resetState
} = userRegisterSlice.actions;

export default userRegisterSlice.reducer