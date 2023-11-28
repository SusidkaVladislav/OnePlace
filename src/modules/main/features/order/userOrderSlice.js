import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    loading: false,
    showSuccessfulOrderAlert: false,
}


const userOrderSlice = createSlice({
    name: 'userOrder',
    initialState,
    reducers: {
        setShowSuccessfulOrerAlert: (state, { payload }) =>
        {
            return {
                ...state,
                showSuccessfulOrderAlert: payload
            }
        }
    }
})

export const {
    setShowSuccessfulOrerAlert
} = userOrderSlice.actions;

export default userOrderSlice.reducer;