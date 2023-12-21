import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import { instance } from '../../../../api.config';

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    likedProductsCount: 0,
    likedProducts: [],
    likedProductsData: [],
    isInLiked: false,
    likedProductLoading: false,
    likedProductsDataLoading: false,
    likedProductsServerConnectionError: false,
    deleteFromLikedProductsLoading: false, 
}

export const isProductInLiked = createAsyncThunk('likedProducts/isProductInLiked', async (productId, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(`${REACT_APP_BASE_URL}/User/isProductInLiked/${productId}`);
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

export const addToLiked = createAsyncThunk('likedProducts/addToLiked', async (productId, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(`${REACT_APP_BASE_URL}/User/addLikedProduct`, null, {
            params: { id: productId },
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

export const deleteFromLiked = createAsyncThunk('likedProducts/deleteFromLiked', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.delete(`${REACT_APP_BASE_URL}/User/deleteLikedProduct/${id}`);
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

export const getLikedProducts = createAsyncThunk('likedProducts/getLikedProducts', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(`${REACT_APP_BASE_URL}/User/getLikedProducts`);
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

export const getLikedProductsData = createAsyncThunk('likedProducts/getLikedProductsData', async (productIds, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(`${REACT_APP_BASE_URL}/Product/getLikedProducts`, productIds);
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

const likedProductsSlice = createSlice({
    name: 'likedProducts',
    initialState,
    reducers: {
        resetLikedProductsState: (state) =>
        {
            return {
                ...state,
                likedProductsCount: 0,
                likedProducts: [],
                likedProductsData: [],
                isInLiked: false,
                likedProductLoading: false,
                likedProductsDataLoading: false,
            }
        },
        setLikedProductsCount: (state, { payload }) =>
        {
            return {
                ...state,
                likedProductsCount: payload
            }
        },
        resetLikedProductsServerConnectionError: (state) =>
        {
            return {
                ...state,
                likedProductsServerConnectionError: false,
            }
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(isProductInLiked.pending, (state) =>
            {
                return {
                    ...state,
                    likedProductLoading: true,
                }
            })
            .addCase(isProductInLiked.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    isInLiked: payload,
                    likedProductLoading: false,
                }
            })
            .addCase(isProductInLiked.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    isInLiked: false,
                    likedProductLoading: false,
                    likedProductsServerConnectionError: isServerConnectionError
                }
            })

            .addCase(addToLiked.pending, (state) =>
            {
                return {
                    ...state,
                    likedProductLoading: true,
                }
            })
            .addCase(addToLiked.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    isInLiked: true,
                    likedProductLoading: false,
                }
            })
            .addCase(addToLiked.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    isInLiked: false,
                    likedProductLoading: false,
                    likedProductsServerConnectionError: isServerConnectionError
                }
            })

            .addCase(deleteFromLiked.pending, (state) =>
            {
                return {
                    ...state,
                    deleteFromLikedProductsLoading: true,
                }
            })
            .addCase(deleteFromLiked.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    isInLiked: false,
                    deleteFromLikedProductsLoading: false,
                }
            })
            .addCase(deleteFromLiked.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    deleteFromLikedProductsLoading: false,
                    likedProductsServerConnectionError: isServerConnectionError
                }
            })

            .addCase(getLikedProducts.pending, (state) =>
            {
                return {
                    ...state,
                    likedProductLoading: true,
                }
            })
            .addCase(getLikedProducts.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    likedProductLoading: false,
                    likedProducts: payload,
                    likedProductsCount: payload?.length
                }
            })
            .addCase(getLikedProducts.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    likedProductLoading: false,
                    likedProductsCount: 0,
                    likedProductsServerConnectionError: isServerConnectionError
                }
            })
            .addCase(getLikedProductsData.pending, (state) =>
            {
                return {
                    ...state,
                    likedProductsDataLoading: true,
                }
            })
            .addCase(getLikedProductsData.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    likedProductsDataLoading: false,
                    likedProductsData: payload,
                }
            })
            .addCase(getLikedProductsData.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    likedProductsDataLoading: false,
                    likedProductsServerConnectionError: isServerConnectionError
                }
            })
    }
})

export const {
    resetLikedProductsState,
    setLikedProductsCount,
    resetLikedProductsServerConnectionError,
} = likedProductsSlice.actions

export default likedProductsSlice.reducer
