import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    loading: false,
    products: [],
    isErrorProduct: false,

    productErrorModel: {},
}

export const getProductsByFilters = createAsyncThunk('user/getProductsByFilters', async (filter, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.post(REACT_APP_BASE_URL + '/Product/search', filter);
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
});


const userProductSlice = createSlice({
    name: 'userProducts',
    initialState,
    reducers: {
        resetErrorProduct: ((state) =>
        {
            return {
                ...state,
                isError: false,
            }
        })
    },
    extraReducers(builder)
    {
        builder
            .addCase(getProductsByFilters.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                    isError: false,
                }
            })
            .addCase(getProductsByFilters.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                    products: payload,
                    isError: false,
                }
            })
            .addCase(getProductsByFilters.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                    isErrorProduct: true,
                    //productErrorModel: payload,
                }
            })
    }
})

export const {
    resetErrorProduct
} = userProductSlice.actions;

export default userProductSlice.reducer;