import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    loading: false,

    activeTab: 'allAboutProduct',

    userName: '',
    userEmail: '',
}


const userViewProductSlice = createSlice({
    name: 'userViewProduct',
    initialState,
    reducers: {
        setActiveTab: (state, { payload }) =>
        {
            return {
                ...state,
                activeTab: payload,
            }
        },
        setName: (state, { payload }) =>
        {
            return {
                ...state,
                userName: payload,
            }
        },
        setEmail: (state, { payload }) =>
        {
            return {
                ...state,
                userEmail: payload,
            }
        }
    },
    extraReducers(builder)
    {
        // builder
    }
})

export const {
    setActiveTab,
    setName,
    setEmail,
} = userViewProductSlice.actions;

export default userViewProductSlice.reducer;