import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import '../ItemReviewStyle.css';
import BackTextAndArrowIcon from '../../../../../../svg/arrows/BackTextAndArrowIcon';
import SendMessageIcon from '../../../../../../svg/shared-icons/SendMessageIcon';
import UnknownUserIcon from '../../../../../../svg/shared-icons/UnknownUserIcon';
import StarRating from '../../../../../../services/starRating/StarRating';
import { useSelector, useDispatch } from 'react-redux';
import { getReviewById, getAllReviewReplies, fetchPostReview, fetchGetReviewReply, fetchReviews, fetchReviewReplies } from '../../../../features/adminReviews/adminReviewsSlice';


const ReviewInfo = () =>
{
    const dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate()
    const reviewId = params.id;

    const [message, setMessage] = useState('')
    const date = new Date();
    const clickedReview = useSelector(state => getReviewById(state, Number(reviewId)));
    const reviewsReply = useSelector(state => getAllReviewReplies(state));
    //const {replyById}=useSelector(state=>state.adminReviews);

    //console.log(reviewsReply);
    const handleSendAnswer = (id) =>
    {
        const reviewID = id;
        const comment = message;

        const reviewPostData = {
            reviewId: reviewID,
            comment: comment,
            date: date,
        };
        dispatch(fetchPostReview(reviewPostData))
            .then(() =>
            {
                dispatch(fetchReviewReplies());
            })
    }

    const handleMessageChange = (event) =>
    {
        setMessage(event.target.value);

    }

    return (
        <div>
            <div className='user-div'>
                <div className='back-div'>
                    <div className='review-user-img'>
                        <label> <UnknownUserIcon /></label>
                    </div>
                    {clickedReview !== null ? (
                        <label className='user-name'>{clickedReview?.userName} {clickedReview?.userSurname}</label>
                    ) : (<label className='user-name'>No User Selected</label>)}
                    <label className='back-button' onClick={() => navigate(-1)} > <BackTextAndArrowIcon /></label>
                </div>
                <div className='review-list'>
                    <div className='review-list-item'>
                        {clickedReview !== null ? (
                            <div>
                                <div className="review-list-header">
                                    <img src={clickedReview.productPictureAddress} alt={clickedReview.productName} className='review-list-img' width={50} height={50}></img>
                                    <div className='review-list-title'><label>{clickedReview.productName}</label></div>
                                    <div className='review-list-code'><label> {clickedReview.productCode}</label></div>
                                    <div className='review-star-rating'>
                                        <StarRating filledStars={clickedReview.numberOfStars} />
                                    </div>
                                    <div className='review-list-date'>
                                        <label>
                                            {clickedReview.date}
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className='review-item-by-user'>
                                        <div className='review-item-by-user-msg'>
                                            <label className='review-item-by-user-msg-label'> <UnknownUserIcon /></label>
                                            <div className='review-by-user' id='scrollbar-style-2'>
                                                <label>{clickedReview.comment}</label>
                                            </div>
                                        </div>
                                        {reviewsReply.map((reply) => (
                                            reply.review.id === clickedReview.id ? (
                                                <div key={clickedReview.id} className='review-item-by-admin-msg'>
                                                    <div className='review-by-admin' id='scrollbar-style-2'>
                                                        <label>{reply.comment}</label>
                                                        <div className='review-by-admin-date'>{reply.date}</div>
                                                    </div>
                                                    <img src="https://cdn-icons-png.flaticon.com/512/6897/6897018.png" alt="" />

                                                </div>
                                            ) : null
                                        ))
                                        }
                                    </div>
                                    {!reviewsReply.some((reply) => reply.review.id === clickedReview.id) && (
                                        <div key={clickedReview.id} className='review-msg-from-admin'>
                                            <input type="text"
                                                onChange={handleMessageChange}
                                                placeholder='Додайте коментар' />
                                            <label onClick={() => handleSendAnswer(clickedReview.id)}><SendMessageIcon /></label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (<label className='review-list-title'>No Review Selected</label>)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewInfo;

