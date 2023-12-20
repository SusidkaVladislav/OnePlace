import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import { instance } from "../../../../api.config"

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    loadingUserOrders: false,
    userOrders: [],
}

export const getAllMyOrders = createAsyncThunk('myOrders/getAllMyOrders', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/Order/getAllUsersOrders');
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

const myOrderSlice = createSlice({
    name: 'myOrders',
    initialState,
    reducers: {},
    extraReducers(builder)
    {
        builder
            .addCase(getAllMyOrders.pending, (state) =>
            {
                return {
                    ...state,
                    loadingUserOrders: true,
                }
            })
            .addCase(getAllMyOrders.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingUserOrders: false,
                    userOrders: payload.data,
                }
            })
            .addCase(getAllMyOrders.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingUserOrders: false,
                }
            })
    }
})

export default myOrderSlice.reducer;