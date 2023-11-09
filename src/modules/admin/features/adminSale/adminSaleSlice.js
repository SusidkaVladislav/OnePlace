import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';
import { instance } from "../../../../api.config.js";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    category: {},
    loading: false,
    sales: [],
}

export const getProductSaleInfo = createAsyncThunk('adminSales/getProductSaleInfo', async (saleStatisticPayload, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/Admin/productSaleInfo', {
            categoryId: Number(saleStatisticPayload.categoryId),
            period: new Date(saleStatisticPayload.period).toISOString(),
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

const adminSalesSlice = createSlice({
    name: 'adminSales',
    initialState,
    reducers: {
        setCategory: (state, { payload }) =>
        {
            return {
                ...state,
                category: payload
            }
        },
        hideSuccessfulAlert: (state) =>
        {
            return {
                ...state,
                successfulAlertShow: false
            }
        },
        hideUnsuccessfulAlert: (state) =>
        {
            return {
                ...state,
                unsuccessfulAlertShow: false
            }
        },
    },
    extraReducers(builder)
    {
        builder
            .addCase(getProductSaleInfo.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getProductSaleInfo.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                    sales: payload
                }
            })
            .addCase(getProductSaleInfo.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    actionNotification: payload.detail,
                }
            })
    }
})

export const getFilteredSales = createSelector(
    state => state.adminSales.sales,
    (_, inputValue) => inputValue.toLowerCase(),
    (sales, inputValue) =>
    {
        return sales.filter(sale =>
            [sale.name, sale.code, sale.color].some(field => field.toLowerCase().includes(inputValue))
        );
    }
);

export const {
    setCategory,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} = adminSalesSlice.actions;

export default adminSalesSlice.reducer;