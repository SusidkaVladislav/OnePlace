import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    isCategoryOpen: false,

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

export const getCategoriesForSelect = createAsyncThunk('user/gatCategoriesForSelect', async (args, { rejectWithValue }) =>
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

const userCategorySlice = createSlice({
    name: 'userCategories',
    initialState,
    reducers: {
        setIsCategoryOpen: (state, { payload }) =>
        {
            return {
                ...state,
                isCategoryOpen: payload,
            }
        }
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
    }
})

export const {
    setIsCategoryOpen
} = userCategorySlice.actions;

export default userCategorySlice.reducer;