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

    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',

    city: '',
    department: '',

    paymentMethod: 0,

    cardNumber: '',
    expireMonth: '',
    expireYear: '',
    cvv: '',

    comment: '',

    errorList: [
        false, false, false, false, false, false,
    ],
    cardErrorList: [
        false, false, false, false,
    ],
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
        },
        setName: (state, { payload }) =>
        {
            return {
                ...state,
                userName: payload
            }
        },
        setSurname: (state, { payload }) =>
        {
            return {
                ...state,
                userSurname: payload
            }
        },
        setEmail: (state, { payload }) =>
        {
            return {
                ...state,
                userEmail: payload
            }
        },
        setPhone: (state, { payload }) =>
        {
            return {
                ...state,
                userPhone: payload
            }
        },
        setCity: (state, { payload }) =>
        {
            return {
                ...state,
                city: payload,
            }
        },
        setDepartment: (state, { payload }) =>
        {
            return {
                ...state,
                department: payload
            }
        },
        setErrorList: (state, { payload }) =>
        {
            return {
                ...state,
                errorList: payload,
            }
        },
        setPaymentMethod: (state, { payload }) =>
        {
            return {
                ...state,
                paymentMethod: payload,
            }
        },
        setCardNumber: (state, { payload }) =>
        {
            return {
                ...state,
                cardNumber: payload,
            }
        },
        setExpireMonth: (state, { payload }) =>
        {
            return {
                ...state,
                expireMonth: payload,
            }
        },
        setExpireYear: (state, { payload }) =>
        {
            return {
                ...state,
                expireYear: payload,
            }
        },
        setCvv: (state, { payload }) =>
        {
            return {
                ...state,
                cvv: payload,
            }
        },
        setComment: (state, { payload }) =>
        {
            return {
                ...state,
                comment: payload,
            }
        },
        setCardErrorList: (state, { payload }) =>
        {
            return {
                ...state,
                cardErrorList: payload,
            }
        },
    }
})

export const {
    setShowSuccessfulOrerAlert,

    setName,
    setSurname,
    setEmail,
    setPhone,

    setCity,
    setDepartment,

    setPaymentMethod,
    setCardNumber,
    setExpireMonth,
    setExpireYear,
    setCvv,

    setComment,

    setErrorList,
    setCardErrorList,
} = userOrderSlice.actions;

export default userOrderSlice.reducer;