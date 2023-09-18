import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    codeUnitColor: 'black',
    isCodeValid: false
}


const codeVerificationSlice = createSlice({
    name: 'verificationCode',
    initialState,
    reducers: {
        changeBorderStyle: (state, {payload}) =>
        {
            state.codeUnitColor = payload;
        },
        setValidCode: (state, {payload}) =>{
            state.isCodeValid = payload;
        },
        reset: (state) => {
            state.codeUnitColor = 'black';
            state.isCodeValid = false;
        },
    },
})

export const { changeBorderStyle, setValidCode, reset } = codeVerificationSlice.actions;

export default codeVerificationSlice.reducer