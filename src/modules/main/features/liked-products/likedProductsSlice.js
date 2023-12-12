import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import { instance } from '../../../../api.config';
import { AlternateEmail } from "@mui/icons-material";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    isInLiked: false,
    likedProductLoading: false,
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

const likedProductsSlice = createSlice({
    name: 'likedProducts',
    initialState,
    reducers: {
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
            .addCase(isProductInLiked.rejected, (state) =>
            {
                return {
                    ...state,
                    isInLiked: false,
                    likedProductLoading: false,
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
            .addCase(addToLiked.rejected, (state) =>
            {
                return {
                    ...state,
                    isInLiked: false,
                    likedProductLoading: false,
                }
            })

            .addCase(deleteFromLiked.pending, (state) =>
            {
                return {
                    ...state,
                    likedProductLoading: true,
                }
            })
            .addCase(deleteFromLiked.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    isInLiked: false,
                    likedProductLoading: false,
                }
            })
            .addCase(deleteFromLiked.rejected, (state) =>
            {
                return {
                    ...state,
                    likedProductLoading: false,
                }
            })
    }
})

export const {

} = likedProductsSlice.actions

export default likedProductsSlice.reducer
