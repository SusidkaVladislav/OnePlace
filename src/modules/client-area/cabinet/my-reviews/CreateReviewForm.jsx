import React, { useState } from 'react';

import
{
    Grid,
    Typography,
} from "@mui/material";

import StarRating from '../../../productPage/controls/StarRating';
import SendMessageBrownIcon from '../../../../svg/shared-icons/SendMessageBrownIcon';

import { useDispatch, useSelector } from 'react-redux';
import
{
    createReview,
    setShowReviewMessage,
} from '../../features/reviews/myReviewsSlice';
import LoadingAnimation from '../../../../common-elements/loading/LoadingAnimation';

const CreateReviewForm = (props) =>
{
    const {
        id,
    } = props;

    const dispatch = useDispatch();

    const {
        createUserReviewLoading
    } = useSelector(state => state.myReviews);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('')
    const [commentValidError, setCommentValidError] = useState(false)

    if (createUserReviewLoading)
    {
        return (
            <Grid
                sx={{
                    minHeight: '100vh'
                }}
            >
                <LoadingAnimation />
            </Grid>
        )
    }
    return (
        <Grid
            container
            item
            height={'200px'}
        >
            <Grid
                item
                xs={12}
                height={"20%"}
                sx={{
                    paddingLeft: '5%',
                }}
            >
                <span
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    <StarRating
                        defaultRating={5}
                        onRatingChange={(value) =>
                        {
                            setRating(value);
                        }}
                    />
                </span>
            </Grid>
            <Grid
                item
                xs={12}
                height={'80%'}
                sx={{
                    padding: '0px 10px 10px 10px',
                }}
            >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <textarea
                        style={{
                            width: '100%',
                            height: '100%',
                            padding: '10px',
                            resize: 'none',
                            border: 'none',
                            borderRadius: '10px',
                            boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)',
                            border: commentValidError ? '1px solid red' : 'none',
                        }}
                        placeholder='Введіть ваш відгук'
                        className='t1-bold-blue'
                        value={comment}
                        onChange={({ target }) =>
                        {
                            setComment(target.value);
                            if (commentValidError)
                            {
                                setCommentValidError(false)
                            }
                        }}
                    />

                    <span
                        style={{
                            position: 'absolute',
                            right: '10px',
                            bottom: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={async () =>
                        {
                            if (comment.length < 2)
                            {
                                setCommentValidError(true)
                            }
                            else
                            {
                                await dispatch(createReview({
                                    numberOfStars: rating,
                                    comment: comment,
                                    productId: id,
                                })).then(() =>
                                {
                                    setTimeout(() =>
                                    {
                                        dispatch(setShowReviewMessage(false));
                                        setComment('');
                                    }, 2000)
                                })
                            }
                        }}
                    >
                        <SendMessageBrownIcon />
                    </span>
                </div>

            </Grid>
        </Grid>
    )
}

export default CreateReviewForm;