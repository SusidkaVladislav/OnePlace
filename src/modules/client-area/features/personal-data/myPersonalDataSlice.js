import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import { instance } from "../../../../api.config"

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    messageFromServer: '',
    updataPersonalDataLoading: false,
    updatePasswordLoading: false,
    passwordMessage: '',
    showPasswordSuccessAlert: false,
}

export const updataPhoto = createAsyncThunk('myPersonalData/updataPhoto', async (pictureAddress, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.put(REACT_APP_BASE_URL + '/User/updatePhoto', pictureAddress);
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
})

export const updataPersonalData = createAsyncThunk('myPersonalData/updataPersonalData', async (userData, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.put(REACT_APP_BASE_URL + '/User/updatePesonalData', userData);
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
})

export const updatePassword = createAsyncThunk('myPersonalData/updatePassword', async (passwordUpdate, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.put(REACT_APP_BASE_URL + '/User/password', passwordUpdate);
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
})

const myPersonalDataSlice = createSlice({
    name: 'myPersonalData',
    initialState,
    reducers: {
        resetMessageFromServer: (state) =>
        {
            return {
                ...state,
                messageFromServer: ''
            }
        },
        resetPasswordMessage: (state) =>
        {
            return {
                ...state,
                passwordMessage: ''
            }
        },
        setShowPasswordSuccessAlert: (state, { payload }) =>
        {
            return {
                ...state,
                showPasswordSuccessAlert: payload
            }
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(updataPersonalData.pending, (state) =>
            {
                return {
                    ...state,
                    updataPersonalDataLoading: true,
                }
            })
            .addCase(updataPersonalData.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    updataPersonalDataLoading: false,
                }
            })
            .addCase(updataPersonalData.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    updataPersonalDataLoading: false,
                    messageFromServer: payload.detail
                }
            })

            .addCase(updatePassword.pending, (state, { payload }) =>
            {
                return {
                    ...state,
                    updatePasswordLoading: true,
                }
            })
            .addCase(updatePassword.fulfilled, (state) =>
            {
                return {
                    ...state,
                    updatePasswordLoading: false,
                }
            })
            .addCase(updatePassword.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    updatePasswordLoading: false,
                    passwordMessage: payload.detail
                }
            })
    }
})

export const {
    resetMessageFromServer,
    resetPasswordMessage,
    setShowPasswordSuccessAlert,
} = myPersonalDataSlice.actions;

export default myPersonalDataSlice.reducer;