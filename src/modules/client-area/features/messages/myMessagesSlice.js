import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import { instance } from "../../../../api.config"

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    loadingUserMessages: false,
    userMessages: [],

    myMessagesServerConnectionError: false,
}

export const getAllMyMessages = createAsyncThunk('myMessages/getAllMyMessages', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/User/getUserMessages');
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

const myMessageSlice = createSlice({
    name: 'myMessages',
    initialState,
    reducers: {
        resetMyMessagesServerConnectionError: (state) =>
        {
            return {
                ...state,
                myMessagesServerConnectionError: false,
            }
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(getAllMyMessages.pending, (state) =>
            {
                return {
                    ...state,
                    loadingUserMessages: true,
                }
            })
            .addCase(getAllMyMessages.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingUserMessages: false,
                    userMessages: payload.data
                }
            })
            .addCase(getAllMyMessages.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    loadingUserMessages: false,
                    myMessagesServerConnectionError: isServerConnectionError,
                }
            })
    }
})

export const {
    resetMyMessagesServerConnectionError
} = myMessageSlice.actions;

export default myMessageSlice.reducer;