import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://localhost:7052/api';

//const usersAdapter = createEntityAdapter()

const initialState = {
    commonUsersInfo: [],
    users: [],
    loading: null,
}

//Всі дані про користувачів зберігаються і обробляютсья тут 

export const fetchUsers = createAsyncThunk('adminUsers/fetchUsers', async () =>
{
    const response = await axios.get(API_URL + '/Account/getAllUsers');
    return response.data
})

const adminUsersSlice = createSlice({
    name: 'adminUsers',
    initialState,
    reducers: {},
    extraReducers(builder)
    {
        builder
        .addCase(fetchUsers.pending, (state) =>
        {
            state.loading = "Loading...";
        })
        .addCase(fetchUsers.fulfilled, (state, {payload}) =>
        {
            state.users = payload;

            state.commonUsersInfo = payload.map(({ id, name, surname, phoneNumber, email, orders }) => 
                ({ id, name, surname, phoneNumber, email, orders }))

            state.loading = null;
        })
        .addCase(fetchUsers.rejected, (state) =>
        {
            state.loading = null;
        })
    }
})


export const getAllUsers = (state) => state.adminUsers.commonUsersInfo;

export const getFilteredUsers = (state, inputValue) => 
  state.adminUsers.commonUsersInfo.filter(user =>
    [user.name, user.surname, user.email, user.phoneNumber].some(field =>
      field.toLowerCase().includes(inputValue.toLowerCase())
    )
  );


export default adminUsersSlice.reducer