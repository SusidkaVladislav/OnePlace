import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { instance } from "../../../../api.config.js";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
  messages: [],
  users: [],
  products: [],
  product: null,

  successfulAlertShow: false,
  unsuccessfulAlertShow: false,
  actionNotification: '',
  loading: false,
}

export const getMessages = createAsyncThunk('adminMessages/getMessages', async (_, { rejectWithValue }) =>
{
  try
  {
    const response = await instance.get(REACT_APP_BASE_URL + '/Admin/message');
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
  }

})

export const updateMessage = createAsyncThunk('adminMessages/updateMessage', async (message, { rejectWithValue }) =>
{
  try
  {
    const response = await instance.put(REACT_APP_BASE_URL + '/Admin/message',
      { id: message.id, isReplied: message.isReplied }
    );
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

export const deleteMessage = createAsyncThunk('adminMessages/deleteMessage', async (messages, { rejectWithValue }) =>
{
  try
  {
    const deleteRequests = messages.map((messageId) =>
    {
      return instance.delete(`${REACT_APP_BASE_URL}/Admin/message/${messageId}`);
    });
    const response = await Promise.all(deleteRequests);
    return response.map((res) => res.data);
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


const adminMessagesSlice = createSlice({
  name: 'adminMessages',
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
      .addCase(getMessages.pending, (state) =>
      {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(getMessages.fulfilled, (state, { payload }) =>
      {
        return {
          ...state,
          messages: payload,
          loading: false,
        }
      })
      .addCase(getMessages.rejected, (state) =>
      {
        return {
          ...state,
          loading: false,
        }
      })

      .addCase(updateMessage.pending, (state) =>
      {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(updateMessage.fulfilled, (state, { payload }) =>
      {
        // console.log(state.messages)
        // const updatedMessageIndex = state.messages.findIndex(
        //   (msg) => msg.id === payload.id
        // );

        // if (updatedMessageIndex !== -1)
        // {
        //   state.messages[updatedMessageIndex] = payload;
        // }

        return {
          ...state,
          unsuccessfulAlertShow: false,
          successfulAlertShow: true,
          loading: false,
          actionNotification: 'Повідомлення відредаговано!',
        }
      })
      .addCase(updateMessage.rejected, (state, { payload }) =>
      {
        return {
          ...state,
          successfulAlertShow: false,
          unsuccessfulAlertShow: true,
          loading: false,
          actionNotification: payload.detail,
        }
      })

      .addCase(deleteMessage.pending, (state) =>
      {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(deleteMessage.fulfilled, (state, { payload }) =>
      {
        return {
          ...state,
          unsuccessfulAlertShow: false,
          successfulAlertShow: true,
          loading: false,
          actionNotification: 'Повідомлення видалено!'
        }
      })
      .addCase(deleteMessage.rejected, (state, { payload }) =>
      {
        return {
          ...state,
          successfulAlertShow: false,
          unsuccessfulAlertShow: true,
          loading: false,
          actionNotification: payload.detail,
        }
      });;

  }
})

export const getAllMessages = (state) => state.adminMessages.messages;


export const getFilteredMessages = (state, inputValue) =>
{
  const filteredMessages = state.adminMessages.messages.filter(msg =>
    [msg.name, msg.email].some(field =>
      field.toLowerCase().includes(inputValue.toLowerCase())
    )
  );

  const sortByReply = filteredMessages.sort((msg1, msg2) =>
  {
    return msg1.isReplied - msg2.isReplied;
  });

  return sortByReply.sort((msg1, msg2) =>
  {
    const date1 = new Date(msg1.date);
    const date2 = new Date(msg2.date);

    return date2 - date1;
  });
};

export const getMessageById = (state, msgId) =>
  state.adminMessages.messages.find(msg => msg.id === msgId);

export const {
  hideSuccessfulAlert,
  hideUnsuccessfulAlert,
} = adminMessagesSlice.actions;

export default adminMessagesSlice.reducer