import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    users: [],
    loading: null,
}

export const fetchUsers = createAsyncThunk('adminUsers/fetchUsers', async () =>
{
    const response = await axios.get(REACT_APP_BASE_URL + '/Admin/user');
    return response.data
})

const adminUsersSlice = createSlice({
    name: 'adminUsers',
    initialState,
    reducers: {
        
    },
    extraReducers(builder)
    {
        builder
            .addCase(fetchUsers.pending, (state) =>
            {
                state.loading = "Loading...";
            })
            .addCase(fetchUsers.fulfilled, (state, { payload }) =>
            {
                state.users = payload;
                
                state.loading = null;
            })
            .addCase(fetchUsers.rejected, (state) =>
            {
                state.loading = null;
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
    state.adminUsers.users.find(user => user.id === userId)

export default adminUsersSlice.reducer