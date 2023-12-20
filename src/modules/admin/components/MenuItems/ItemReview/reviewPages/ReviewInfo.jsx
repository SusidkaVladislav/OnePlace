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
import LoadingAnimation from '../../../../../../common-elements/loading/LoadingAnimation';

const ReviewInfo = () =>
{
    const dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate()
    const reviewId = params.id;

    const [message, setMessage] = useState('')
    const [messagePageLoadingControll, setMessagePageLoadingControll] = useState(true)

    const {
        loadingReviewReply,
        loadingReplies,
        loadingRewieById,
        reviewById,
        replyById,
    } = useSelector(state => state.adminReviews)

    useEffect(() =>
    {
        dispatch(getGetReviewReply(Number(params.id)))
        dispatch(getReviewById(Number(params.id))).then(({ payload }) =>
        {
            setMessagePageLoadingControll(false)
        })
    }, [params.id])

    const handleSendAnswer = (id) =>
    {
        if (message.length > 0)
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
    }

    const handleMessageChange = (event) =>
    {
        setMessage(event.target.value);
    }


    if (loadingReviewReply)
    {
        return <LoadingAnimation />
    }
    if (loadingRewieById)
    {
        return <LoadingAnimation />
    }
    if (loadingReplies)
    {
        return <LoadingAnimation />
    }
    if (messagePageLoadingControll)
    {
        return <LoadingAnimation />
    }
    return (
        <Fragment>
            <div className='user-div'>
                <div className='back-div'>
                    <div className='review-user-img'>
                        <label>
                            {
                                reviewById?.userPictureAddress !== null ?
                                    <img
                                        src={reviewById?.userPictureAddress}
                                        alt='userIcon'
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: '90px',
                                        }}
                                    /> : <UnknownUserIcon />
                            }
                        </label>
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
                                                <label className='review-item-by-user-msg-label'>
                                                    {
                                                        reviewById?.userPictureAddress !== null ?
                                                            <img
                                                                src={reviewById?.userPictureAddress}
                                                                alt='userIcon'
                                                                style={{
                                                                    width: '50px',
                                                                    height: '50px',
                                                                    borderRadius: '90px',
                                                                }}
                                                            /> : <UnknownUserIcon />
                                                    }
                                                </label>
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
                                                    style={{
                                                        padding: '10px',
                                                        borderRadius: '10px',
                                                        border: 'none'
                                                    }}
                                                    onChange={handleMessageChange}
                                                    placeholder='Додайте коментар' />
                                                <label onClick={() => { handleSendAnswer(reviewById?.id) }}><SendMessageIcon /></label>
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

