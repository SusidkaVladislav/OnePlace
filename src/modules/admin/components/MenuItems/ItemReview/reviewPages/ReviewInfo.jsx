import React, { useState, Fragment, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import '../ItemReviewStyle.css';
import BackTextAndArrowIcon from '../../../../../../svg/arrows/BackTextAndArrowIcon';
import SendMessageIcon from '../../../../../../svg/shared-icons/SendMessageIcon';
import UnknownUserIcon from '../../../../../../svg/shared-icons/UnknownUserIcon';
import StarRating from '../../../../../../services/starRating/StarRating';
import { useSelector, useDispatch } from 'react-redux';
import
{
    getReviewById,
    createPostReview,
    getGetReviewReply,

} from '../../../../features/adminReviews/adminReviewsSlice';
import LoadingIcon from '../../../../../../svg/animations/LoadingAnimation.gif';

const ReviewInfo = () =>
{
    const dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate()
    const reviewId = params.id;

    const [message, setMessage] = useState('')

    const {
        loading,
        loadingReplies,
        loadingRewieById,
        reviewById,
        replyById,
    } = useSelector(state => state.adminReviews)

    useEffect(() =>
    {
        dispatch(getGetReviewReply(Number(reviewId)))
        dispatch(getReviewById(Number(reviewId)))
    }, [])

    const handleSendAnswer = (id) =>
    {
        const reviewID = id;
        const comment = message;

        const reviewPostData = {
            reviewId: reviewID,
            comment: comment,
        };
        dispatch(createPostReview(reviewPostData))
            .then(() =>
            {
                dispatch(getGetReviewReply(Number(reviewId)))
            })
    }

    const handleMessageChange = (event) =>
    {
        setMessage(event.target.value);
    }

    if (loading || loadingReplies || loadingRewieById)
    {
        return <img style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            alignSelf: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }} src={LoadingIcon} alt="loading" />
    }


    return (
        <Fragment>
            <div className='user-div'>
                <div className='back-div'>
                    <div className='review-user-img'>
                        <label> <UnknownUserIcon /></label>
                    </div>
                    {
                        reviewById !== null ? (
                            <label className='user-name'>{reviewById?.userName} {reviewById?.userSurname}</label>
                        ) : (<label className='user-name'>No User Selected</label>)
                    }
                    <label className='back-button' onClick={() => navigate(-1)} > <BackTextAndArrowIcon /></label>
                </div>
                <div className='review-list'>
                    <div className='review-list-item'>
                        {
                            reviewById !== null ? (
                                <div>
                                    <div className="review-list-header">
                                        <img src={reviewById?.productPictureAddress} alt={reviewById?.productName}
                                            className='review-list-img' width={50} height={50}></img>
                                        <div
                                            className='t1-bold'
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginLeft: '10px',
                                                width: '45%',
                                                overflow: 'hidden',
                                                wordBreak: 'break-word'
                                            }}
                                        ><label>{reviewById?.productName}</label></div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginLeft: '10px',
                                                width: '15%',
                                            }}>
                                            <label className='t1-bold'> {reviewById?.productCode}</label></div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginLeft: '10px',
                                            width: '20%',
                                            justifyItems: 'center',
                                        }}>
                                            <StarRating filledStars={reviewById?.numberOfStars} />
                                        </div>

                                        <div className='review-list-date'>
                                            <h6
                                                className='bold-blue '
                                            >
                                                {new Date(reviewById?.date).getDate() + '.' + (new Date(reviewById?.date).getMonth() + 1) + '.' + new Date(reviewById?.date).getFullYear()}
                                            </h6>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='review-item-by-user'>
                                            <div className='review-item-by-user-msg'>
                                                <label className='review-item-by-user-msg-label'> <UnknownUserIcon /></label>
                                                <div className='review-by-user t2-medium-blue' id='scrollbar-style-2'>
                                                    {reviewById?.comment}
                                                </div>
                                            </div>
                                            {
                                                replyById !== undefined ? (
                                                    <div key={reviewById?.id} className='review-item-by-admin-msg'>
                                                        <div className='review-by-admin' id='scrollbar-style-2'>
                                                            <label className='t2-medium-blue'>{replyById?.comment}</label>
                                                            <div className='review-by-admin-date'>{new Date(replyById?.date).getDate() + '.' + (new Date(replyById?.date).getMonth() + 1) + '.' + new Date(replyById?.date).getFullYear()}</div>
                                                        </div>
                                                        <img src="https://cdn-icons-png.flaticon.com/512/6897/6897018.png" alt="" />
                                                    </div>
                                                ) : null
                                            }
                                        </div>
                                        {replyById === undefined && (
                                            <div key={reviewById?.id} className='review-msg-from-admin'>
                                                <input type="text"
                                                    onChange={handleMessageChange}
                                                    placeholder='Додайте коментар' />
                                                <label onClick={() => handleSendAnswer(reviewById?.id)}><SendMessageIcon /></label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (<label className='review-list-title'>No Review Selected</label>)
                        }

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ReviewInfo;

