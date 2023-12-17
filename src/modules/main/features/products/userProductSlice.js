import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    loadingProduct: false,
    loadingRating: false,
    loadingRecommendedProducts: false,
    products: [],
    recommendedProducts: [],
    allRecommendedProducts: [],
    isErrorProduct: false,

    productErrorModel: {},

    product: {},
    productRaitingInfo: {},
}

export const getProductsByFilters = createAsyncThunk('user/getProductsByFilters', async (filter, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.post(REACT_APP_BASE_URL + '/Product/search', filter, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`
            }
        });
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

export const getProductById = createAsyncThunk('user/getProductById', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + `/Product/product/${id}`);
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

export const getProductRaitingInfo = createAsyncThunk('user/getProductRaitingInfo', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + `/Product/getProductReviewsAnalitic/${id}`);
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

export const getRecommendedProducts = createAsyncThunk('user/getRecommendedProducts', async (getRecommendedProducts, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.post(REACT_APP_BASE_URL + '/Product/getRecommendedProducts', getRecommendedProducts, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`
            }
        });
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

export const getAllRecommendedProducts = createAsyncThunk('user/getAllRecommendedProducts', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.post(REACT_APP_BASE_URL + '/Product/getAllRecommendedProducts', null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`
            }
        });
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
                    loadingProduct: true,
                    isError: false,
                }
            })
            .addCase(getProductsByFilters.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingProduct: false,
                    products: payload,
                    isError: false,
                }
            })
            .addCase(getProductsByFilters.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingProduct: false,
                    isErrorProduct: true,
                    //productErrorModel: payload,
                }
            })

            .addCase(getProductById.pending, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingProduct: true,
                }
            })
            .addCase(getProductById.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingProduct: false,
                    product: payload,
                }
            })
            .addCase(getProductById.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingProduct: false,
                }
            })

            .addCase(getProductRaitingInfo.pending, (state) =>
            {
                return {
                    ...state,
                    loadingRating: true,
                }
            })
            .addCase(getProductRaitingInfo.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    productRaitingInfo: payload,
                    loadingRating: false,
                }
            })
            .addCase(getProductRaitingInfo.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingRating: false,
                }
            })

            .addCase(getRecommendedProducts.pending, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingRecommendedProducts: true,
                }
            })
            .addCase(getRecommendedProducts.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingRecommendedProducts: false,
                    recommendedProducts: payload,
                }
            })
            .addCase(getRecommendedProducts.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingRecommendedProducts: false,
                }
            })

            .addCase(getAllRecommendedProducts.pending, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingRecommendedProducts: true,
                }
            })
            .addCase(getAllRecommendedProducts.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingRecommendedProducts: false,
                    allRecommendedProducts: payload,
                }
            })
            .addCase(getAllRecommendedProducts.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingRecommendedProducts: false,
                }
            })
    }
})

export const {
    resetErrorProduct
} = userProductSlice.actions;

export default userProductSlice.reducer;