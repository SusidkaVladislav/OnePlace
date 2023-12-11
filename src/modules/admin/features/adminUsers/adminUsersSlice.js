import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../../api.config.js";
const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    users: [],
    userPersonalData: {},
    loading: null,
    successfulAlertShow: false,
    unsuccessfulAlertShow: false,
    actionNotification: '',
    usersCountByDate: 0,
}

export const getUsers = createAsyncThunk('adminUsers/getUsers', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/Admin/user');
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

export const deleteUser = createAsyncThunk('adminUsers/deleteUser', async (userId, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.delete(`${REACT_APP_BASE_URL}/Admin/user/${Number(userId)}`);
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

export const getUsersCount = createAsyncThunk('adminUsers/getUsersCount', async (date, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(`${REACT_APP_BASE_URL}/Admin/getUsersCount/${new Date(date).toISOString()}`);
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

export const getUserPersonalData = createAsyncThunk('adminUser/getUserPersonalData', async (userId, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(`${REACT_APP_BASE_URL}/Admin/getUserPersonalData`, null, {
            params: { userId: userId },
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

const adminUsersSlice = createSlice({
    name: 'adminUsers',
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
            .addCase(getUsers.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getUsers.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    users: payload,
                    loading: false,
                }
            })
            .addCase(getUsers.rejected, (state) =>
            {
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(deleteUser.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteUser.fulfilled, (state) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: false,
                    successfulAlertShow: true,
                    loading: false,
                    actionNotification: 'Користувача видалено!'
                }
            })
            .addCase(deleteUser.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                }
            })

            .addCase(getUsersCount.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getUsersCount.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,
                    usersCountByDate: payload
                }
            })
            .addCase(getUsersCount.rejected, (state) =>
            {
                return {
                    ...state,
                    loading: false
                }
            })

            .addCase(getUserPersonalData.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getUserPersonalData.fulfilled, (state, { payload }) =>
            {

                return {
                    ...state,
                    loading: false,
                    userPersonalData: payload,
                }
            })
            .addCase(getUserPersonalData.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: false,

                }
            })
    }
})


export const getAllUsers = (state) => state.adminUsers.users;

export const getFilteredUsers = (state, inputValue) =>
    state.adminUsers.users.filter(user =>
        [user.name, user.surname, user.email, user.phoneNumber].some(field =>
            field.toLowerCase().includes(inputValue.toLowerCase())
        )
    );

export const getUserById = (state, userId) =>
    state.adminUsers.users.find(user => user.id === userId);

export const {
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} = adminUsersSlice.actions;

export default adminUsersSlice.reducer