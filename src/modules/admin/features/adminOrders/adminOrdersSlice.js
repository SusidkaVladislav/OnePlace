import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    orders: [],
    loading: null,
}

export const fetchOrders = createAsyncThunk('adminOrders/fetchOrders', async () =>
{
    //const response = await axios.get(REACT_APP_BASE_URL );
    //return response.data
})

export const fetchAllOrdersByUserId = createAsyncThunk('adminOrders/fetchAllOrdersByUserId', async (userId) =>
{
    const orderSearchParams = {
        UserId: userId,
        Date: null,
        State: null,
        UserInitials: null,
        PaymentStatus: null
    }
    const response = await axios.post(REACT_APP_BASE_URL + '/Order/search', orderSearchParams);
    return response.data
})

const adminOrdersSlice = createSlice({
    name: 'adminOrders',
    initialState,
    reducers: {},
    extraReducers(builder)
    {
        builder
            .addCase(fetchOrders.pending, (state) =>
            {
                state.loading = "Loading...";
            })
            .addCase(fetchOrders.fulfilled, (state, { payload }) =>
            {
                state.orders = payload;

                state.commonOrdersInfo = payload.map(({ id }) =>
                    ({ id }))

                state.loading = null;
            })
            .addCase(fetchOrders.rejected, (state) =>
            {
                state.loading = null;
            })

            .addCase(fetchAllOrdersByUserId.pending, (state) =>
            {
                state.loading = "Loading...";
            })
            .addCase(fetchAllOrdersByUserId.fulfilled, (state, {payload}) =>
            {
                state.orders = payload;
                state.loading = null;
            })
            .addCase(fetchAllOrdersByUserId.rejected, (state) =>
            {
                state.loading = null;
            })
    }
})


export const getAllOrders = (state) => state.adminOrders.orders;

export const getOrdersById = (state, orderId) =>
    state.adminOrders.orders.find(order => order.id === orderId)

export const getOrdersByUserId = (state, userId) =>
    state.adminOrders.orders.filter(order => order.userId === userId)

export default adminOrdersSlice.reducer