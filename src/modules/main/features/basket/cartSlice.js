import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from '../../../../api.config';

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    products: [],

    checkedProductIds: [],

    productPriceSum: 0,
    totalOrderPrice: 0,
    discountPrice: 0,

    isAuth: false,
    cartCount: 0,

    loading: false,
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
    name: 'cart',
    initialState,
    reducers: {
        setCartCount: (state, { payload }) =>
        {
            return {
                ...state,
                cartCount: payload
            }
        },
        changeProductPriceSum: (state, { payload }) =>
        {
            return {
                ...state,
                productPriceSum: payload,
            }
        },
        changeTotalOrderPrice: (state, { payload }) =>
        {
            return {
                ...state,
                totalOrderPrice: payload,
            }
        },
        changeDiscountPrice: (state, { payload }) =>
        {
            return {
                ...state,
                discountPrice: payload
            }
        },
        setCheckedIds: (state, { payload }) =>
        {
            return {
                ...state,
                checkedProductIds: payload,
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
                    loading: true,
                }
            })
            .addCase(addToCart.fulfilled, (state) =>
            {
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(addToCart.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                }
            })

            .addCase(getUserCart.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
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
                    loading: false,
                    isAuth: true,
                    cartCount: cart.length,
                }
            })
            .addCase(getUserCart.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                    isAuth: false,
                }
            })

            .addCase(deleteFromCart.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteFromCart.fulfilled, (state) =>
            {
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(deleteFromCart.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
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
                    products: payload
                }
            })
            .addCase(getProductsFromCart.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                }
            })
    }
})

export const {
    setCartCount,
    changeProductPriceSum,
    changeTotalOrderPrice,
    changeDiscountPrice,
    setCheckedIds,
} = cartSlice.actions

export default cartSlice.reducer