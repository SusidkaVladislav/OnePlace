import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

import { instance } from "../../../../api.config.js";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    messages: [],
    users:[],
    products:[],
    product:null,
    loading: null,
}

export const fetchMessages = createAsyncThunk('adminMessages/fetchMessages', async () =>
{
     const response = await instance.get(REACT_APP_BASE_URL + '/Admin/message');
     return response.data;
})

export const fetchPutMessage=createAsyncThunk('adminMessages/fetchPutMessage', async (message) =>{
    try {

        const response = await instance.put(REACT_APP_BASE_URL+'/Admin/message',
          { id:message.id,isReplied:message.isReplied }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
})

export const fetchDeleteMessage=createAsyncThunk('adminMessages/fetchDeleteMessage', async (messages) =>
{
    try {

      const deleteRequests = messages.map((messageId) => {
        return instance.delete(`${REACT_APP_BASE_URL}/Admin/message/${messageId}`);
      });
      const response = await Promise.all(deleteRequests);
      return response.map((res) => res.data);

    } catch (error) {
      throw error; 
    }
})


const adminMessagesSlice = createSlice({
    name: 'adminMessages',
    initialState,
    reducers: {
        
    },
    extraReducers(builder)
    {
        builder
            .addCase(fetchMessages.pending, (state) =>
            {
                state.loading = "Loading...";
            })
            .addCase(fetchMessages.fulfilled, (state, { payload }) =>
            {
                state.messages = payload;
                state.loading = null;
            })
            .addCase(fetchMessages.rejected, (state) =>
            {
                state.loading = null;
            })
            .addCase(fetchPutMessage.pending, (state) => {
                // You can add loading indicators for this operation if needed
            })
            .addCase(fetchPutMessage.fulfilled, (state, { payload }) => {
              const updatedMessageIndex = state.messages.findIndex(
                  (msg) => msg.id === payload.id
              );
              if (updatedMessageIndex !== -1) {
                  state.messages[updatedMessageIndex] = payload;
              }
                // You can update loading indicators or other state as needed
            })
            .addCase(fetchPutMessage.rejected, (state, action) => {
            })
            .addCase(fetchDeleteMessage.pending, (state) => {
              state.loading = 'Deleting messages...';
            })
            .addCase(fetchDeleteMessage.fulfilled, (state, { payload }) => {
              state.loading = null;
            })
            .addCase(fetchDeleteMessage.rejected, (state) => {
              state.loading = null;
            });;
            
    }
})

export const getAllMessages = (state) => state.adminMessages.messages;


export const getFilteredMessages = (state, inputValue) =>
    state.adminMessages.messages.filter(msg =>
        [msg.name,msg.email].some(field =>
            field.toLowerCase().includes(inputValue.toLowerCase())
        )
    );

export const getMessageById = (state, msgId) =>
    state.adminMessages.messages.find(msg => msg.id === msgId);

export default adminMessagesSlice.reducer