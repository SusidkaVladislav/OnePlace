import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    isLoginFormOpen: false,
    isRegisterFormOpen: false,
    isRenewPasswordFormOpen: false,
}



const userAuthSlice = createSlice({
    name: 'userAuthState',
    initialState,
    reducers: {
        setIsLoginFormOpen: (state, { payload }) =>
        {
            return {
                ...state,
                isLoginFormOpen: payload
            }
        },
        setIsRegisterFormOpen: (state, { payload }) =>
        {
            return {
                ...state,
                isRegisterFormOpen: payload
            }
        },
        setIsRenewPasswordFormOpen: (state, { payload }) =>
        {
            return {
                ...state,
                isRenewPasswordFormOpen: payload
            }
        }
    }
})

export const {
    setIsLoginFormOpen,
    setIsRegisterFormOpen,
    setIsRenewPasswordFormOpen,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;