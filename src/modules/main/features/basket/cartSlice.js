import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from '../../../../api.config';

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    products: [],
    checkedProductIds: [],
    isAuth: false,
    cartCount: 0,
    loading: false,

    cartServerConnectionError: false,

    getUserCartLoading: false,
    addToCartLoading: false,
    deleteFromCartLoading: false,
};

export const addToCart = createAsyncThunk('user/addToCart', async (cart, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/User/shoppingCart', cart);
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

export const getUserCart = createAsyncThunk('user/getUserCart', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/User/shoppingCart');
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

export const deleteFromCart = createAsyncThunk('user/deleteFromCart', async (cart, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.delete(`${REACT_APP_BASE_URL}/User/shoppingCart`, { data: cart });
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

export const getProductsFromCart = createAsyncThunk('user/getProductsFromCart', async (ids, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(`${REACT_APP_BASE_URL}/Product/getProductsFromCart`, ids);
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

const cartSlice = createSlice({
    name: 'userBasket',
    initialState,
    reducers: {
        resetCartState: (state) =>
        {
            return {
                ...state,
                products: [],
                checkedProductIds: [],
                isAuth: false,
                cartCount: 0,
                loading: false,
                getUserCartLoading: false,
                addToCartLoading: false,
                deleteFromCartLoading: false,
            }
        },
        setCartCount: (state, { payload }) =>
        {
            return {
                ...state,
                cartCount: payload
            }
        },
        setCheckedIds: (state, { payload }) =>
        {
            return {
                ...state,
                checkedProductIds: payload,
            }
        },
        resetCartServerConnectionError: (state) =>
        {
            return {
                ...state,
                cartServerConnectionError: false,
            }
        },
    },
    extraReducers(builder)
    {
        builder
            .addCase(addToCart.pending, (state) =>
            {
                return {
                    ...state,
                    addToCartLoading: true,
                }
            })
            .addCase(addToCart.fulfilled, (state) =>
            {
                return {
                    ...state,
                    addToCartLoading: false,
                }
            })
            .addCase(addToCart.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    addToCartLoading: false,
                    cartServerConnectionError: isServerConnectionError
                }
            })

            .addCase(getUserCart.pending, (state) =>
            {
                return {
                    ...state,
                    getUserCartLoading: true,
                }
            })
            .addCase(getUserCart.fulfilled, (state, { payload }) =>
            {
                var cart = [];

                if (payload) 
                {
                    payload.map(item =>
                    {
                        cart.push({
                            productId: Number(item.productId),
                            colorId: Number(item.colorId),
                        })
                    })
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                return {
                    ...state,
                    getUserCartLoading: false,
                    isAuth: true,
                    cartCount: cart.length,
                }
            })
            .addCase(getUserCart.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    getUserCartLoading: false,
                    isAuth: false,
                    cartServerConnectionError: isServerConnectionError
                }
            })

            .addCase(deleteFromCart.pending, (state) =>
            {
                return {
                    ...state,
                    deleteFromCartLoading: true,
                }
            })
            .addCase(deleteFromCart.fulfilled, (state) =>
            {
                return {
                    ...state,
                    deleteFromCartLoading: false,
                }
            })
            .addCase(deleteFromCart.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    deleteFromCartLoading: false,
                    cartServerConnectionError: isServerConnectionError
                }
            })

            .addCase(getProductsFromCart.pending, (state,) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getProductsFromCart.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                    products: payload,
                }
            })
            .addCase(getProductsFromCart.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    loading: false,
                    cartServerConnectionError: isServerConnectionError
                }
            })
    }
})

export const {
    resetCartState,
    setCartCount,
    setCheckedIds,
    resetCartServerConnectionError,
} = cartSlice.actions

export default cartSlice.reducer
