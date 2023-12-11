import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../../api.config.js";

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    reviews: [],
    replies: [],
    userReviews: [],
    replyById: {},
    reviewById: {},
    successfulAlertShow: false,
    unsuccessfulAlertShow: false,
    actionNotification: '',
    loading: null,

    loadingReviews: false,
    loadingReplies: false,
    loadingRewieById: false,
    loadingUserReviews: false,
}

export const getReviews = createAsyncThunk('adminReviews/fetchReviews', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/Admin/review');
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

export const getReviewReplies = createAsyncThunk('adminReviews/fetchReviewReplies', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(REACT_APP_BASE_URL + '/Admin/reviewReply');
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

export const getGetReviewReply = createAsyncThunk('adminReviews/fetchGetReviewReply', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(`${REACT_APP_BASE_URL}/Admin/reviewReply/${Number(id)}`);
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

export const createPostReview = createAsyncThunk('adminReviews/fetchPostReview', async (reply, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/Admin/reviewReply',
            { reviewId: reply.reviewId, comment: reply.comment }
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

export const deleteReview = createAsyncThunk('adminReviews/fetchDeleteReview', async (reviews, { rejectWithValue }) =>
{
    try
    {
        const deleteRequests = reviews.map((messageId) =>
        {
            return instance.delete(`${REACT_APP_BASE_URL}/Admin/review/${messageId}`);
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

export const getReviewById = createAsyncThunk('adminReviews/getReviewById', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(`${REACT_APP_BASE_URL}/Admin/review/${Number(id)}`);
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

export const getUserReviews = createAsyncThunk('adminReviews/getUserReviews', async (userId, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.get(`${REACT_APP_BASE_URL}/Admin/getUserReviews/${Number(userId)}`);
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

const adminReviewsSlice = createSlice({
    name: 'adminReviews',
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
            .addCase(getReviews.pending, (state) =>
            {
                return {
                    ...state,
                    loadingReviews: true,
                }
            })
            .addCase(getReviews.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    reviews: payload,
                    loadingReviews: false,
                }
            })
            .addCase(getReviews.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: true,
                    successfulAlertShow: false,
                    actionNotification: payload.detail,
                    loadingReviews: false,
                }
            })

            .addCase(getReviewReplies.pending, (state) =>
            {
                return {
                    ...state,
                    loadingReplies: true,
                }
            })
            .addCase(getReviewReplies.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    replies: payload,
                    loadingReplies: false,
                }
            })
            .addCase(getReviewReplies.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: true,
                    successfulAlertShow: false,
                    actionNotification: payload.detail,
                    loadingReplies: false,
                }
            })

            .addCase(getGetReviewReply.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getGetReviewReply.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    replyById: payload,
                    loading: false,
                }
            })
            .addCase(getGetReviewReply.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: true,
                    successfulAlertShow: false,
                    actionNotification: payload.detail,
                    loading: false,
                }
            })

            .addCase(createPostReview.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(createPostReview.fulfilled, (state) =>
            {
                return {
                    ...state,
                    loading: false,
                }

            })
            .addCase(createPostReview.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                }
            })

            .addCase(deleteReview.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteReview.fulfilled, (state) =>
            {
                return {
                    ...state,
                    unsuccessfulAlertShow: false,
                    successfulAlertShow: true,
                    loading: false,
                    actionNotification: 'Коментарі видалено!'
                }
            })
            .addCase(deleteReview.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail,
                }
            })

            .addCase(getReviewById.pending, (state) =>
            {
                return {
                    ...state,
                    loadingRewieById: true,
                }
            })
            .addCase(getReviewById.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    reviewById: payload,
                    loadingRewieById: false,
                }
            })
            .addCase(getReviewById.rejected, (state) =>
            {
                return {
                    ...state,
                    loadingRewieById: false,
                }
            })
            .addCase(getUserReviews.pending, (state) =>
            {
                return {
                    ...state,
                    loadingUserReviews: true,
                }
            })
            .addCase(getUserReviews.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingUserReviews: false,
                    userReviews: payload,
                }
            })
            .addCase(getUserReviews.rejected, (state) =>
            {
                return {
                    ...state,
                    loadingUserReviews: false,
                }
            })
    }
})

export const getAllReviewReplies = (state) => state.adminReviews.replies;

export const getFilteredReviews = (state, inputValue) =>
    state.adminReviews.reviews.filter(review =>
        [review.userName, review.userSurname, review.productName, review.date].some(field =>
            field.toLowerCase().includes(inputValue.toLowerCase())
        )
    );

export const {
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} = adminReviewsSlice.actions;

export default adminReviewsSlice.reducer