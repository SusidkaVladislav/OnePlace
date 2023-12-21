import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    productInfoFilters: [],
    reviewsProduct: [],
    analiticLoading: false,

    analiticServerConnectionError: false,
}

export const getCategoryProductsInfo = createAsyncThunk('user/getCategoryProductsInfo', async (categoryId, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + '/Analitic/getCategoryProductsInfo/' + Number(categoryId));
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

export const getProductReviews = createAsyncThunk('user/getProductReviews', async (productId, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + '/Analitic/getProductReviews/' + Number(productId));
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

const userAnaliticSlice = createSlice({
    name: 'userAnalitic',
    initialState,
    reducers: {
        resetAnalicticServerConnectionError: (state) =>
        {
            return {
                ...state,
                analiticServerConnectionError: false,
            }
        },
    },
    extraReducers(builder)
    {
        builder
            .addCase(getCategoryProductsInfo.pending, (state) =>
            {
                return {
                    ...state,
                    analiticLoading: true,
                }
            })
            .addCase(getCategoryProductsInfo.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    productInfoFilters: payload,
                    analiticLoading: false,
                }
            })
            .addCase(getCategoryProductsInfo.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    analiticLoading: false,
                    analiticServerConnectionError: isServerConnectionError
                }
            })

            .addCase(getProductReviews.pending, (state) =>
            {
                return {
                    ...state,
                    analiticLoading: true,
                }
            })
            .addCase(getProductReviews.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    reviewsProduct: payload,
                    analiticLoading: false,
                }
            })
            .addCase(getProductReviews.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    analiticLoading: false,
                    analiticServerConnectionError: isServerConnectionError
                }
            })
    }
})

export const {
    resetAnalicticServerConnectionError,
} = userAnaliticSlice.actions;

export default userAnaliticSlice.reducer;