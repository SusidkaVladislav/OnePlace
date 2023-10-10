import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios"; 
//import reviewData from './reviews.json';
//import reviewReply from './reviewReply.json'

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    reviews: [],
    replies: [],
    replyById:{},
    loading: null,
}

export const fetchReviews = createAsyncThunk('adminReviews/fetchReviews', async () =>
{
    const response = await axios.get(REACT_APP_BASE_URL + '/Admin/review');
    return response.data
    //return reviewData;
})

export const fetchReviewReplies = createAsyncThunk('adminReviews/fetchReviewReplies', async () =>
{
    const response = await axios.get(REACT_APP_BASE_URL + '/Admin/reviewReply');
    return response.data
    //return reviewReply;
})

export const fetchGetReviewReply= createAsyncThunk('adminReviews/fetchGetReviewReply', async(id)=>
{
    const response = await axios.get(`${REACT_APP_BASE_URL}/Admin/reviewReply/${Number(id)}`);
    console.log(response);
    return response.data

})

export const fetchPostReview= createAsyncThunk('adminReviews/fetchPostReview', async (reply) =>
{
    try {

        const response = await axios.post(REACT_APP_BASE_URL+'/Admin/reviewReply',
          { reviewId: reply.reviewId,comment:reply.comment,date:reply.date}
        );
        return response.data;
      } catch (error) {
        throw error; // Let Redux Toolkit handle the error state
      }
})

export const fetchDeleteReview=createAsyncThunk('adminReviews/fetchDeleteReview', async (reviews) =>
{
    try {

      const deleteRequests = reviews.map((messageId) => {
        return axios.delete(`${REACT_APP_BASE_URL}/Admin/review/${messageId}`);
      });
      const response = await Promise.all(deleteRequests);
      return response.map((res) => res.data);

    } catch (error) {
      throw error; 
    }
})

const adminReviewsSlice = createSlice({
    name: 'adminReviews',
    initialState,
    reducers: {
        
    },
    extraReducers(builder)
    {
        builder
            .addCase(fetchReviews.pending, (state) =>
            {
                state.loading = "Loading...";
            })
            .addCase(fetchReviews.fulfilled, (state, { payload }) =>
            {
                state.reviews = payload;
                state.loading = null;
            })
            .addCase(fetchReviews.rejected, (state) =>
            {
                state.loading = null;
            })
            .addCase(fetchReviewReplies.pending, (state) =>
            {
                state.loading = "Loading...";
            })
            .addCase(fetchReviewReplies.fulfilled, (state, { payload }) =>
            {
                state.replies = payload;
                state.loading = null;
            })
            .addCase(fetchReviewReplies.rejected, (state) =>
            {
                state.loading = null;
            })
            .addCase(fetchPostReview.pending, (state) => {})
            .addCase(fetchPostReview.fulfilled, (state, { payload }) => {state.loading = null;})
            .addCase(fetchPostReview.rejected, (state, action) => {state.loading = null;})
            .addCase(fetchGetReviewReply.pending, (state) => {})
            .addCase(fetchGetReviewReply.fulfilled, (state, { payload }) => {
                state.reviewById = payload;
                state.loading = null;})
            .addCase(fetchGetReviewReply.rejected, (state, action) => {state.loading = null;})
            .addCase(fetchDeleteReview.pending, (state) => {
                state.loading = 'Deleting reviews...';
              })
              .addCase(fetchDeleteReview.fulfilled, (state, { payload }) => {
                state.loading = null;
              })
              .addCase(fetchDeleteReview.rejected, (state) => {
                state.loading = null;
              });;
    }
})

//export const getAllReviews = (state) => state.adminReviews.reviews;
export const getAllReviewReplies = (state) => state.adminReviews.replies;

export const getFilteredReviews = (state, inputValue) =>
    state.adminReviews.reviews.filter(review =>
        [review.userName,review.userSurname].some(field =>
            field.toLowerCase().includes(inputValue.toLowerCase())
        )
);

export const getReviewById = (state, reviewId) =>
    state.adminReviews.reviews.find(review => review.id === reviewId)

export default adminReviewsSlice.reducer