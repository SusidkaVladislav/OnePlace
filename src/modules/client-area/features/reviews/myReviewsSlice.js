import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import { instance } from "../../../../api.config"

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    loadingUserReviews: false,
    createUserReviewLoading: false,
    userReviews: [],
    reviewMessage: '',
    showReviewMessage: false,
}

export const getAllMyReviews = createAsyncThunk('myReviews/getAllMyReviews', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(REACT_APP_BASE_URL + '/User/getUserReviews');
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

export const deleteReview = createAsyncThunk('myReviews/deleteReview', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.delete(`${REACT_APP_BASE_URL}/User/review/${Number(id)}`);
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

export const createReview = createAsyncThunk('myReviews/createReview', async (review, { rejectWithValue }) =>
{
    try
    {
        const response = await instance.post(`${REACT_APP_BASE_URL}/User/review`, review);
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

const myReviewsSlice = createSlice({
    name: 'myReviews',
    initialState,
    reducers: {
        setShowReviewMessage: (state, { payload }) =>
        {
            return {
                ...state,
                showReviewMessage: payload,
            }
        },
    },
    extraReducers(builder)
    {
        builder
            .addCase(getAllMyReviews.pending, (state) =>
            {
                return {
                    ...state,
                    loadingUserReviews: true,
                }
            })
            .addCase(getAllMyReviews.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingUserReviews: false,
                    userReviews: payload.data,
                }
            })
            .addCase(getAllMyReviews.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    loadingUserReviews: false,
                }
            })

            .addCase(createReview.pending, (state) =>
            {
                return {
                    ...state,
                    createUserReviewLoading: true,
                }
            })
            .addCase(createReview.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    createUserReviewLoading: false,
                    reviewMessage: 'Відгук успішно надіслано!',
                    showReviewMessage: true,
                }
            })
            .addCase(createReview.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    createUserReviewLoading: false,
                    showReviewMessage: true,
                    reviewMessage: payload?.detail
                }
            })
    }
})

export const {
    setShowReviewMessage,
} = myReviewsSlice.actions

export default myReviewsSlice.reducer;