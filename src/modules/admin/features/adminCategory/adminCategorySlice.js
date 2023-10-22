import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    mainCategories: [],
    categoryPath: [
        {
            id: null,
            title: ''
        }
    ],
    childrenCategories: [],
    categoryByIdData: {},
    successfulAlertShow: false,
    unsuccessfulAlertShow: false,
    actionNotification: '',
    chosenCategoryId: null,
    categoriesForSelect: [],
}

export const getCategoriesForSelect = createAsyncThunk('admin/gatCategoriesForSelect', async (args, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + '/Category/forSelect');
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

export const getCategories = createAsyncThunk('admin/getCategories', async (arg, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + '/Category/categories');
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

export const getCategoryById = createAsyncThunk('admin/getCategory', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + "/Category/category/" + id);
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

export const addCategory = createAsyncThunk('admin/addCategory', async (category, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.post(REACT_APP_BASE_URL + "/Category/create", category);
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
                detail: error.response.data.errors.Name[0],
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

export const updateCategory = createAsyncThunk('admin/updateCategory', async (categoryToUpdate, { rejectWithValue }) =>
{
    const response = await axios.put(REACT_APP_BASE_URL + "/Category/update", categoryToUpdate);
    return response.data;
})

export const deleteCategory = createAsyncThunk('admin/deleteCategory', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.delete(REACT_APP_BASE_URL + "/Category/delete", {
            params: { id: id },
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

const adminCategorySlice = createSlice({
    name: 'adminCategories',
    initialState,
    reducers: {
        changeCategoryPath: (state, { payload }) =>
        {
            return {
                ...state,
                chosenCategoryId: payload.id,
                categoryPath: [...state.categoryPath, payload],
            };
        },
        sliceCategoryPath: (state, { payload }) =>
        {
            const index = state.categoryPath.findIndex((element) => element.id === payload.id)
            const updatedCategoryPath = state.categoryPath.slice(0, index + 1)

            return {
                ...state,
                chosenCategoryId: payload.id,
                categoryPath: updatedCategoryPath,
            };
        },
        resetPath: (state) =>
        {
            return {
                ...state,
                chosenCategoryId: null,
                categoryPath: []
            }
        },
        resetState: (state) =>
        {
            return {
                ...state,
                mainCategories: [],
                categoryPath: [
                    {
                        id: null,
                        title: ''
                    }
                ],
                childrenCategories: [],
                categoryByIdData: {},
                successfulAlertShow: false,
                unsuccessfulAlertShow: false,
                actionNotification: '',
                chosenCategoryId: null,
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
        resetCategoriesforSelect: (state) =>{
            return{
                ...state,
                categoriesForSelect: []
            }
        },
    },
    extraReducers(builder)
    {
        builder
            .addCase(getCategoriesForSelect.fulfilled, (state, { payload }) =>
            {
                for (let i = 0; i < payload.length; i++){
                    payload[i].name = payload[i].name.charAt(0).toUpperCase() + payload[i].name.slice(1)
                }

                return {
                    ...state,
                    categoriesForSelect: payload
                }
            })

            .addCase(getCategories.fulfilled, (state, { payload }) =>
            {
                //Першу букву назви категорії зробити великою
                for (let i = 0; i < payload.length; i++){
                    payload[i].name = payload[i].name.charAt(0).toUpperCase() + payload[i].name.slice(1)
                }

                console.log(payload)

                return {
                    ...state,
                    mainCategories: payload
                }
            })
            .addCase(getCategoryById.fulfilled, (state, { payload }) =>
            {
                for (let i = 0; i < payload.childrenCategories.length; i++){
                    payload.childrenCategories[i].name = payload.childrenCategories[i].name.charAt(0).toUpperCase() + payload.childrenCategories[i].name.slice(1)
                }

                return {
                    ...state,
                    childrenCategories: payload.childrenCategories,
                    categoryByIdData: {
                        name: payload.name,
                        pictureAddress: payload.pictureAddress
                    }
                }
            })
            .addCase(addCategory.fulfilled, (state) =>
            {
                return {
                    ...state,
                    successfulAlertShow: true,
                    unsuccessfulAlertShow: false,
                    actionNotification: 'Категорію успішно додано!'
                }
            })
            .addCase(addCategory.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    actionNotification: payload.detail
                }
            })
            .addCase(deleteCategory.fulfilled, (state) =>
            {
                return {
                    ...state,
                    successfulAlertShow: true,
                    unsuccessfulAlertShow: false,
                    actionNotification: 'Категорію успішно видалено!'
                }
            })
            .addCase(deleteCategory.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    actionNotification: payload.detail
                }
            })
    }
})

export const {
    changeCategoryPath,
    sliceCategoryPath,
    resetPath,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
    resetState,
    resetCategoriesforSelect, } = adminCategorySlice.actions;

export default adminCategorySlice.reducer