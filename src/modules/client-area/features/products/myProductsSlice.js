import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import { instance } from "../../../../api.config"

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    loadingBoughtProducts: false,
    boughtProducts: [],
}

export const getSoldProducts = createAsyncThunk('myProducts/getSoldProducts', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/User/getSoldProducts');
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

const myProductsSlice = createSlice({
    name: 'myProducts',
    initialState,
    reducers: {},
    extraReducers(builder)
    {
        builder
            .addCase(getSoldProducts.pending, (state) =>
            {
                return {
                    ...state,
                    loadingBoughtProducts: true,
                }
            })
            .addCase(getSoldProducts.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingBoughtProducts: false,
                    boughtProducts: payload.data,
                }
            })
            .addCase(getSoldProducts.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingBoughtProducts: false,
                }
            })
    }
})

export default myProductsSlice.reducer;