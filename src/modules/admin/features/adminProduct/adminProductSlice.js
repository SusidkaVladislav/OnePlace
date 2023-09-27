import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    category: {
        id: null,
        name: 'Категорії'
    },
    allBrands: [],
    allCountries: [],
}

export const getProducts = createAsyncThunk('adminProducts/getProducts', async () =>
{
    //const response = await axios.get(REACT_APP_BASE_URL );
    //return response.data
})

export const getAllBrands = createAsyncThunk('adminProducts/getAllBrands', async (args, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + '/Admin/getAllBrands');
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
    }
})

export const getAllCountries = createAsyncThunk('adminProducts/getAllCountries', async (args, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + '/Admin/getAllCountries');
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
    }
})

const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {
        setCategory: (state, { payload }) =>
        {
            return {
                ...state,
                category: payload
            }
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(getAllBrands.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    allBrands: payload,
                }
            })
            .addCase(getAllCountries.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    allCountries: payload,
                }
            })
    }
})

export const {
    setCategory,
} = adminProductsSlice.actions;

export default adminProductsSlice.reducer