import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from '../../../../api.config';

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    list: [],
    total: 0,
    totalPrice: 0,
    discountPrice: 0,
    loading: false,
    isAuth: false,
    cartCount: 0,
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
        }
        // addToCart: (state, action) =>
        // {
        //     const check = state.list.findIndex(book => book.id === action.payload.id)
        //     if (check !== -1)
        //     {
        //         state.list[check].quantity += action.payload.quantity
        //     } else
        //     {
        //         state.list.push(action.payload)
        //     }

        //     state.total = state.list.reduce((sum, book) => sum + +book?.price * book?.quantity, 0)
        // },
        // updateQuantity: (state, action) =>
        // {
        //     const check = state.list.findIndex(book => book.id === action.payload.id)
        //     if (check !== -1)
        //     {
        //         state.list[check].quantity = action.payload.quantity
        //     }
        //     state.total = state.list.reduce((sum, book) => sum + +book?.price * book?.quantity, 0)
        // },
        // removeItem: (state, action) =>
        // {
        //     state.list = state.list.filter(book => book.id !== action.payload.id)
        //     state.total = state.list.reduce((sum, book) => sum + +book?.price * book?.quantity, 0)
        // },
        // incrementTotalPrice: (state, action) =>
        // {
        //     let price = action.payload + state.totalPrice;

        //     return {
        //         ...state,
        //         totalPrice: price,

        //     }

        // },
        // decrementTotalPrice: (state, action) =>
        // {
        //     let price = state.totalPrice - action.payload;

        //     return {
        //         ...state,
        //         totalPrice: price,

        //     }

        // },
        // updateDiscountPrice: (state, { payload }) =>
        // {
        //     return {
        //         ...state,
        //         discountPrice: payload,
        //     }
        // }
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
    }
})

//const { actions, reducer } = cartSlice


export const {
    setCartCount,
    // addToCart, updateQuantity, removeItem, decrementTotalPrice, incrementTotalPrice, discountPrice 
} = cartSlice.actions

export default cartSlice.reducer
