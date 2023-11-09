import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import { instance } from "../../../../api.config.js";
import { createSelector } from 'reselect';

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    allCountries: [],
    allBrands: [],
    allColors: [],
    successfulAlertShow: false,
    unsuccessfulAlertShow: false,
    actionNotification: '',
    loading: false,
}

export const getCountries = createAsyncThunk('adminFilter/getCountries', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/Admin/getAllCountries');
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

export const getAllBrands = createAsyncThunk('adminFilter/getAllBrands', async (args, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/Admin/getAllBrands');
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

export const getColors = createAsyncThunk('adminFilter/getAllColors', async (args, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/Admin/getAllColors');
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

export const createColor = createAsyncThunk('adminFilter/createColor', async (color, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/Admin/createColor', color);
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

export const deleteColor = createAsyncThunk('adminFilter/deleteColor', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.delete(REACT_APP_BASE_URL + '/Admin/deleteColor/' + Number(id));
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

export const updateColor = createAsyncThunk('adminFilter/updateColor', async (color, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.put(REACT_APP_BASE_URL + '/Admin/updateColor', color);
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

export const createCountry = createAsyncThunk('adminFilter/createCountry', async (country, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/Admin/createCountry/' + country);
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

export const deleteCountry = createAsyncThunk('adminFilter/deleteCountry', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.delete(REACT_APP_BASE_URL + '/Admin/deleteCountry/' + id);
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

export const updateCountry = createAsyncThunk('adminFilter/updateCountry', async (country, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.put(REACT_APP_BASE_URL + '/Admin/updateCountry', country);
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

        if (error.response.status === 401)
        {
            const customError = {
                status: 401,
                message: "Authentication failed!",
                detail: "Authentication failed!",
            };
            return rejectWithValue(customError)
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

export const createBrand = createAsyncThunk('adminFilter/createBrand', async (brand, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/Admin/createBrand/' + brand);
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

export const deleteBrand = createAsyncThunk('adminFilter/deleteBrand', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.delete(REACT_APP_BASE_URL + '/Admin/deleteBrand/' + id);
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

export const updateBrand = createAsyncThunk('adminFilter/updateBrand', async (brand, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.put(REACT_APP_BASE_URL + '/Admin/updateBrand', brand);
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

function sortByName(a, b)
{
    return a.name.localeCompare(b.name);
}

const adminFilterSlice = createSlice({
    name: 'adminFilter',
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
            .addCase(getCountries.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getCountries.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    allCountries: payload.sort(sortByName),
                    loading: false,
                }
            })
            .addCase(getCountries.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: true,
                    successfulAlertShow: false,
                    actionNotification: payload.detail,
                    loading: false,
                }
            })
            .addCase(getAllBrands.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllBrands.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    allBrands: payload.sort(sortByName),
                    loading: false,
                }
            })
            .addCase(getAllBrands.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: true,
                    successfulAlertShow: false,
                    actionNotification: payload.detail,
                    loading: false,
                }
            })
            .addCase(getColors.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getColors.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    allColors: payload.sort(sortByName),
                    loading: false,
                }
            })
            .addCase(getColors.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: true,
                    successfulAlertShow: false,
                    actionNotification: payload.detail,
                    loading: false,
                }
            })
            .addCase(createColor.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(createColor.fulfilled, (state) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: false,
                    successfulAlertShow: true,
                    loading: false,
                    actionNotification: 'Колір успішно добавлено!'
                }
            })
            .addCase(createColor.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                }
            })
            .addCase(deleteColor.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteColor.fulfilled, (state) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: false,
                    successfulAlertShow: true,
                    loading: false,
                    actionNotification: 'Колір успішно видалено!'
                }
            })
            .addCase(deleteColor.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                }
            })
            .addCase(updateColor.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(updateColor.fulfilled, (state) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: false,
                    successfulAlertShow: true,
                    loading: false,
                    actionNotification: 'Колір успішно відредаговано!'
                }
            })
            .addCase(updateColor.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                }
            })
            .addCase(createCountry.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(createCountry.fulfilled, (state) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: false,
                    successfulAlertShow: true,
                    loading: false,
                    actionNotification: 'Країну успішно добавлено!'
                }
            })
            .addCase(createCountry.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                }
            })
            .addCase(deleteCountry.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteCountry.fulfilled, (state) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: false,
                    successfulAlertShow: true,
                    loading: false,
                    actionNotification: 'Країну успішно видалено!'
                }
            })
            .addCase(deleteCountry.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                }
            })
            .addCase(updateCountry.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(updateCountry.fulfilled, (state) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: false,
                    successfulAlertShow: true,
                    loading: false,
                    actionNotification: 'Країну успішно відредаговано!'
                }
            })
            .addCase(updateCountry.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                };
            })
            .addCase(createBrand.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(createBrand.fulfilled, (state) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: false,
                    successfulAlertShow: true,
                    loading: false,
                    actionNotification: 'Виробника успішно добавлено!'
                }
            })
            .addCase(createBrand.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                }
            })
            .addCase(deleteBrand.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteBrand.fulfilled, (state) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: false,
                    successfulAlertShow: true,
                    loading: false,
                    actionNotification: 'Виробника успішно видалено!'
                }
            })
            .addCase(deleteBrand.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                }
            })
            .addCase(updateBrand.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(updateBrand.fulfilled, (state) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: false,
                    successfulAlertShow: true,
                    loading: false,
                    actionNotification: 'Виродника успішно відредаговано!'
                }
            })
            .addCase(updateBrand.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                }
            })
    }
})

export const {
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,

} = adminFilterSlice.actions;

export const getFilteredCountries = createSelector(
    state => state.adminFilter.allCountries,
    (_, inputValue) => inputValue.toLowerCase(),
    (allCountries, inputValue) =>
    {
        return allCountries.filter(country =>
            [country.name].some(field => field.toLowerCase().includes(inputValue))
        );
    }
);

export const getFilteredBrands = createSelector(
    state => state.adminFilter.allBrands,
    (_, inputValue) => inputValue.toLowerCase(),
    (allBrands, inputValue) =>
    {
        return allBrands.filter(brand =>
            [brand.name].some(field => field.toLowerCase().includes(inputValue))
        );
    }
);

export const getFilteredColors = createSelector(
    state => state.adminFilter.allColors,
    (_, inputValue) => inputValue.toLowerCase(),
    (allColors, inputValue) =>
    {
        return allColors.filter(color =>
            [color.name].some(field => field.toLowerCase().includes(inputValue))
        );
    }
);


export default adminFilterSlice.reducer