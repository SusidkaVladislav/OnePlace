import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../../../../api.config";
const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    orders: [],
    loading: null,
    successfulAlertShow: false,
    unsuccessfulAlertShow: false,
    actionNotification: '',
}

export const getOrders = createAsyncThunk('adminOrders/fetchOrders', async () =>
{
    //const response = await axios.get(REACT_APP_BASE_URL );
    //return response.data
})

export const getOrdersByDate = createAsyncThunk('adminOrders/getOrdersByDate', async (date, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/Order/getByDate', date);
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
        if (error.response.status === 400)
        {
            const customError = {
                status: error.response.data.status,
                message: error.response.data.title,
                detail: error.response.data.title,
            };
            return rejectWithValue(customError)
        }
        const customError = {
            status: error.response.data.status,
            message: error.response.data.title,
            detail: error.response.data.detail,
        };
        return rejectWithValue(customError)
    }
})

export const getAllOrdersByUserId = createAsyncThunk('adminOrders/getAllOrdersByUserId', async (userId, { rejectWithValue }) =>
{
    const orderSearchParams = {
        UserId: userId,
        Date: null,
        State: null,
        UserInitials: null,
        PaymentStatus: null
    }
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/Order/search', orderSearchParams);
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
        if (error.response.status === 400)
        {
            const customError = {
                status: error.response.data.status,
                message: error.response.data.title,
                detail: error.response.data.title,
            };
            return rejectWithValue(customError)
        }
        const customError = {
            status: error.response.data.status,
            message: error.response.data.title,
            detail: error.response.data.detail,
        };
        return rejectWithValue(customError)
    }
})

const adminOrdersSlice = createSlice({
    name: 'adminOrders',
    initialState,
    reducers: {
        hideSuccessfulAlert: (state) =>
        {
            return {
                ...state,
                successfulAlertShow: false,
            }
        },
        hideUnsuccessfulAlert: (state) =>
        {
            return {
                ...state,
                unsuccessfulAlertShow: false,
            }
        },
    },
    extraReducers(builder)
    {
        builder
            .addCase(getOrders.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getOrders.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    orders: payload,
                    loading: false
                }
                // state.commonOrdersInfo = payload.map(({ id }) =>
                //     ({ id }))
            })
            .addCase(getOrders.rejected, (state) =>
            {
                return {
                    ...state,
                    loading: false,
                }
            })

            .addCase(getAllOrdersByUserId.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllOrdersByUserId.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    orders: payload,
                    loading: false,
                }
            })
            .addCase(getAllOrdersByUserId.rejected, (state) =>
            {
                return {
                    ...state,
                    loading: false,
                }
            })

            .addCase(getOrdersByDate.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getOrdersByDate.fulfilled, (state, { payload }) =>
            {
                console.log(payload)
                return {
                    ...state,
                    loading: false,
                    orders: payload
                }
            })
            .addCase(getOrdersByDate.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,

                }
            })
    }
})


export const getAllOrders = (state) => state.adminOrders.orders;

export const getOrdersById = (state, orderId) =>
    state.adminOrders.orders.find(order => order.id === orderId)

export const getOrdersByUserId = (state, userId) =>
    state.adminOrders.orders.filter(order => order.userId === userId)

export const getFilteredOrders = (state, inputValue) =>
    state.adminOrders.orders.filter(order =>
        [order.initials, order.paymentStatus, order.orderStatus].some(field =>
            field.toLowerCase().includes(inputValue.toLowerCase())
        )
    );

export const {
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} = adminOrdersSlice.actions;

export default adminOrdersSlice.reducer