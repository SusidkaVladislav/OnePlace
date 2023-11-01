import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import { instance } from "../../../../api.config.js";


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
    loading: false,
}

export const getCategoriesForSelect = createAsyncThunk('admin/gatCategoriesForSelect', async (args, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/Category/forSelect');
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
        const response = await instance.get(REACT_APP_BASE_URL + '/Category/categories');
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
        const response = await instance.get(REACT_APP_BASE_URL + "/Category/category/" + id);
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
        const response = await instance.post(REACT_APP_BASE_URL + "/Category/create", category);
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
    const response = await instance.put(REACT_APP_BASE_URL + "/Category/update", categoryToUpdate);
    return response.data;
})

export const deleteCategory = createAsyncThunk('admin/deleteCategory', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.delete(REACT_APP_BASE_URL + "/Category/delete", {
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
        resetCategoriesforSelect: (state) =>
        {
            return {
                ...state,
                categoriesForSelect: []
            }
        },
    },
    extraReducers(builder)
    {
        builder
            .addCase(getCategoriesForSelect.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getCategoriesForSelect.fulfilled, (state, { payload }) =>
            {
                for (let i = 0; i < payload.length; i++)
                {
                    payload[i].name = payload[i].name.charAt(0).toUpperCase() + payload[i].name.slice(1)
                }

                return {
                    ...state,
                    categoriesForSelect: payload,
                    loading: false,
                }
            })
            .addCase(getCategoriesForSelect.rejected, (state) =>
            {
                return {
                    ...state,
                    loading: false,
                }
            })


            .addCase(getCategories.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getCategories.fulfilled, (state, { payload }) =>
            {
                //Першу букву назви категорії зробити великою
                for (let i = 0; i < payload.length; i++)
                {
                    payload[i].name = payload[i].name.charAt(0).toUpperCase() + payload[i].name.slice(1)
                }

                return {
                    ...state,
                    mainCategories: payload,
                    loading: false
                }
            })
            .addCase(getCategories.rejected, (state) =>
            {
                return {
                    ...state,
                    loading: false,
                }
            })

            .addCase(getCategoryById.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getCategoryById.fulfilled, (state, { payload }) =>
            {
                for (let i = 0; i < payload.childrenCategories.length; i++)
                {
                    payload.childrenCategories[i].name = payload.childrenCategories[i].name.charAt(0).toUpperCase() + payload.childrenCategories[i].name.slice(1)
                }

                return {
                    ...state,
                    childrenCategories: payload.childrenCategories,
                    categoryByIdData: {
                        name: payload.name,
                        pictureURL: payload.PictureURL,
                        deletePictureURL: payload.DeletePictureURL,
                    },
                    loading: false,
                }
            })
            .addCase(getCategoryById.rejected, (state) =>
            {
                return {
                    ...state,
                    loading: false,
                }
            })


            .addCase(addCategory.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(addCategory.fulfilled, (state) =>
            {
                return {
                    ...state,
                    successfulAlertShow: true,
                    unsuccessfulAlertShow: false,
                    actionNotification: 'Категорію успішно додано!',
                    loading: false,
                }
            })
            .addCase(addCategory.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    actionNotification: payload.detail,
                    loading: false,
                }
            })

            .addCase(updateCategory.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(updateCategory.fulfilled, (state) =>
            {
                return {
                    ...state,
                    successfulAlertShow: true,
                    unsuccessfulAlertShow: false,
                    actionNotification: 'Категорію оновлено!',
                    loading: false,
                }
            })
            .addCase(updateCategory.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    actionNotification: payload.detail,
                    loading: false,
                }
            })


            .addCase(deleteCategory.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteCategory.fulfilled, (state) =>
            {
                return {
                    ...state,
                    successfulAlertShow: true,
                    unsuccessfulAlertShow: false,
                    actionNotification: 'Категорію видалено!',
                    loading: false,
                }
            })
            .addCase(deleteCategory.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    actionNotification: payload.detail,
                    loading: false,
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