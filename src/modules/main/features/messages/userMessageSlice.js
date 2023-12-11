import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    loading: false,
}

export const createMessage = createAsyncThunk('userMessages/createMessage', async (message, { rejectWithValue }) =>
{
    try
    {
        const accessToken = localStorage.getItem("access-token");

        const response = await axios.post(
            `${REACT_APP_BASE_URL}/User/message`,
            message,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

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
        const customError = {
            status: error.response.data.status,
            message: error.response.data.title,
            detail: error.response.data.detail,
        };
        return rejectWithValue(customError)
    }
})

const userMessageSlice = createSlice({
    name: 'userMessages',
    initialState,
    reducers: {

    },
    extraReducers(builder)
    {
        //builder
    }
})



export default userMessageSlice.reducer;