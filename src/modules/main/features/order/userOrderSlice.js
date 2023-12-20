import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import jwt from 'jwt-decode'
import axios from "axios";
import { instance } from "../../../../api.config.js";

const { REACT_APP_BASE_URL } = process.env;
const LOCAL_STORAGE_TOKEN_KEY = "access-token";
const initialState = {
    loading: false,

    showSuccessfulOrderAlert: false,
    showUnsuccessfulOrderAlert: false,
    actionNotification: '',

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
    orderServerConnectionError: false,
}

export const createCashOrder = createAsyncThunk('user/createCashOrder', async (checkedProductIds, { rejectWithValue, getState }) =>
{
    try
    {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        if (accessToken)
        {
            try
            {
                axios.post(`${REACT_APP_BASE_URL}/Account/refresh`,
                    null,
                    {
                        params: {
                            accessToken: accessToken,
                        },
                        withCredentials: true,
                    })
                    .then((response) =>
                    {
                        var oldToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
                        if (oldToken)
                        {
                            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
                        }
                        const user = jwt(response.data);
                        const role = user["Role"];
                        if (role === "user")
                        {
                            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.data);
                        }
                    })
                    .catch(() =>
                    {
                        if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))
                        {
                            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
                        }
                    });
            }
            catch (error)
            { }
        }
        const state = getState();

        let products = [];

        for (let i = 0; i < checkedProductIds.length; i++)
        {
            products.push({
                productId: Number(checkedProductIds[i].id),
                colorId: Number(checkedProductIds[i].colorId),
                quantity: Number(checkedProductIds[i].count),
            })
        }

        const orderCreatePayload = {
            phoneNumber: state.userOrder.userPhone,
            name: state.userOrder.userName,
            surname: state.userOrder.userSurname,
            comment: state.userOrder.comment,
            serviceName: 0,
            city: state.userOrder.city,
            deliveryMethod: 0,
            paymentMethod: state.userOrder.paymentMethod,
            department: state.userOrder.department,
            products: products,
            cardData: {
                number: state.userOrder.cardNumber,
                expireMonth: Number(state.userOrder.expireMonth),
                expireYear: Number(state.userOrder.expireYear),
                cvv: Number(state.userOrder.cvv)
            }
        }

        const response = await axios.post(
            `${REACT_APP_BASE_URL}/Order/createCashOrder`,
            orderCreatePayload,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
                }
            }
        );

        return response;
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
});

export const createCardOrder = createAsyncThunk('user/createCardOrder', async (checkedProductIds, { rejectWithValue, getState }) =>
{
    try
    {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        if (accessToken)
        {
            try
            {
                axios.post(`${REACT_APP_BASE_URL}/Account/refresh`,
                    null,
                    {
                        params: {
                            accessToken: accessToken,
                        },
                        withCredentials: true,
                    })
                    .then((response) =>
                    {
                        var oldToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
                        if (oldToken)
                        {
                            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
                        }
                        const user = jwt(response.data);
                        const role = user["Role"];
                        if (role === "user")
                        {
                            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.data);
                        }
                    })
                    .catch(() =>
                    {
                        if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))
                        {
                            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
                        }
                    });
            }
            catch (error)
            { }
        }
        const state = getState();

        let products = [];

        for (let i = 0; i < checkedProductIds.length; i++)
        {
            products.push({
                productId: Number(checkedProductIds[i].id),
                colorId: Number(checkedProductIds[i].colorId),
                quantity: Number(checkedProductIds[i].count),
            })
        }

        const orderCreatePayload = {
            phoneNumber: state.userOrder.userPhone,
            name: state.userOrder.userName,
            surname: state.userOrder.userSurname,
            comment: state.userOrder.comment,
            serviceName: 0,
            city: state.userOrder.city,
            deliveryMethod: 0,
            paymentMethod: state.userOrder.paymentMethod,
            department: state.userOrder.department,
            products: products,
            cardData: {
                number: state.userOrder.cardNumber,
                expireMonth: Number(state.userOrder.expireMonth),
                expireYear: Number(state.userOrder.expireYear),
                cvv: Number(state.userOrder.cvv)
            }
        }

        const response = await axios.post(
            `${REACT_APP_BASE_URL}/Order/createCardOrder`,
            orderCreatePayload,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
                }
            }
        );

        return response;
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



const userOrderSlice = createSlice({
    name: 'userOrder',
    initialState,
    reducers: {
        resetOrderState: (state) =>
        {
            return {
                ...state,
                loading: false,
                showSuccessfulOrderAlert: false,
                showUnsuccessfulOrderAlert: false,
                actionNotification: '',
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
        },
        setShowSuccessfulOrerAlert: (state, { payload }) =>
        {
            if (payload === false)
            {
                window.location.href = "/"
            }
            return {
                ...state,
                showSuccessfulOrderAlert: payload
            }
        },
        setShowUnsuccessfulOrerAlert: (state, { payload }) =>
        {
            return {
                ...state,
                showUnsuccessfulOrderAlert: payload
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
        resetOrderServerConnectionError: (state) =>
        {
            return {
                ...state,
                orderServerConnectionError: false,
            }
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(createCashOrder.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(createCashOrder.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                    showSuccessfulOrderAlert: true,
                    errorList: [
                        false, false, false, false, false, false,
                    ],
                    cardErrorList: [
                        false, false, false, false,
                    ],
                }
            })
            .addCase(createCashOrder.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                let showUnsuccessful = true;
                let actionNote = payload?.detail;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                    showUnsuccessful = false;
                    actionNote = '';
                }

                return {
                    ...state,
                    loading: false,
                    actionNotification: actionNote,
                    showUnsuccessfulOrderAlert: showUnsuccessful,
                    orderServerConnectionError: isServerConnectionError,
                }
            })

            .addCase(createCardOrder.pending, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(createCardOrder.fulfilled, (state, { payload }) =>
            {
                window.open(payload.data.url, '_self')
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(createCardOrder.rejected, (state, { payload }) =>
            {
                let isServerConnectionError = false;
                if (payload?.status === 500)
                {
                    isServerConnectionError = true;
                }
                return {
                    ...state,
                    loading: false,
                    orderServerConnectionError: isServerConnectionError,
                }
            })
    }
})

export const {
    resetOrderState,

    setShowSuccessfulOrerAlert,
    setShowUnsuccessfulOrerAlert,

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

    resetOrderServerConnectionError,
} = userOrderSlice.actions;

export default userOrderSlice.reducer;