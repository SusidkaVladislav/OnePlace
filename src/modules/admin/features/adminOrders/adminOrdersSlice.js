import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../../api.config";
const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    orders: [],
    order: {},
    loading: null,
    successfulAlertShow: false,
    unsuccessfulAlertShow: false,
    actionNotification: '',

    getOrdersLoading: false,
    getOrdersByDateLoading: false,
    getAllOrdersByUserIdLoading: false,
    getOrderByIdLoading: false,
    updateOrderStatusLoading: false,
    updateOrderPaymentStatusLoading: false,
    deleteOrderLoading: false,
}

export const getOrders = createAsyncThunk('adminOrders/getOrders', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/Order/getAll');
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

export const getOrdersByDate = createAsyncThunk('adminOrders/getOrdersByDate', async (date, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/Order/getByDate', { params: { date: new Date(date).toISOString() } });
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

export const getOrderById = createAsyncThunk('adminOrders/getOrderById', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/Order', { params: { id: Number(id) } });
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

export const updateOrderStatus = createAsyncThunk('adminOrders/updateOrderStatus', async (orderChangeState, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/Order/changeOrderState', orderChangeState);
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

export const updateOrderPaymentStatus = createAsyncThunk('adminOrders/updateOrderPaymentStatus', async (paymentStatePayload, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/Order/changePaymentStatus', paymentStatePayload);
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

export const deleteOrder = createAsyncThunk('adminOrders/deleteOrder', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.delete(REACT_APP_BASE_URL + '/Order/deleteOrder', { params: { id: Number(id) } });
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


function sortByNumber(a, b)
{
    return b.orderNumber - a.orderNumber;
}

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
                    getOrdersLoading: true,
                }
            })
            .addCase(getOrders.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    orders: payload.sort(sortByNumber),
                    getOrdersLoading: false
                }
            })
            .addCase(getOrders.rejected, (state) =>
            {
                return {
                    ...state,
                    getOrdersLoading: false,
                }
            })

            .addCase(getAllOrdersByUserId.pending, (state) =>
            {
                return {
                    ...state,
                    getAllOrdersByUserIdLoading: true,
                }
            })
            .addCase(getAllOrdersByUserId.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    orders: payload.sort(sortByNumber),
                    getAllOrdersByUserIdLoading: false,
                }
            })
            .addCase(getAllOrdersByUserId.rejected, (state) =>
            {
                return {
                    ...state,
                    getAllOrdersByUserIdLoading: false,
                }
            })

            .addCase(getOrdersByDate.pending, (state) =>
            {
                return {
                    ...state,
                    getOrdersByDateLoading: true,
                }
            })
            .addCase(getOrdersByDate.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    getOrdersByDateLoading: false,
                    orders: payload.sort(sortByNumber)
                }
            })
            .addCase(getOrdersByDate.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    getOrdersByDateLoading: false,

                }
            })

            .addCase(getOrderById.pending, (state) =>
            {
                return {
                    ...state,
                    getOrderByIdLoading: true,
                }
            })
            .addCase(getOrderById.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    getOrderByIdLoading: false,
                    order: payload
                }
            })
            .addCase(getOrderById.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    getOrderByIdLoading: false,
                }
            })

            .addCase(updateOrderStatus.pending, (state) =>
            {
                return {
                    ...state,
                    updateOrderStatusLoading: true,
                }
            })
            .addCase(updateOrderStatus.fulfilled, (state) =>
            {
                return {
                    ...state,
                    updateOrderStatusLoading: false,
                }
            })
            .addCase(updateOrderStatus.rejected, (state) =>
            {
                return {
                    ...state,
                    updateOrderStatusLoading: false,
                }
            })

            .addCase(updateOrderPaymentStatus.pending, (state) =>
            {
                return {
                    ...state,
                    updateOrderPaymentStatusLoading: true,
                }
            })
            .addCase(updateOrderPaymentStatus.fulfilled, (state) =>
            {
                return {
                    ...state,
                    updateOrderPaymentStatusLoading: false,
                }
            })
            .addCase(updateOrderPaymentStatus.rejected, (state) =>
            {
                return {
                    ...state,
                    updateOrderPaymentStatusLoading: false,
                }
            })

            .addCase(deleteOrder.pending, (state) =>
            {
                return {
                    ...state,
                    deleteOrderLoading: true,
                }
            })
            .addCase(deleteOrder.fulfilled, (state) =>
            {
                return {
                    ...state,
                    successfulAlertShow: true,
                    unsuccessfulAlertShow: false,
                    deleteOrderLoading: false,
                    actionNotification: 'Замовлення видалено!'
                }
            })
            .addCase(deleteOrder.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    deleteOrderLoading: false,
                    actionNotification: payload.detail,
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