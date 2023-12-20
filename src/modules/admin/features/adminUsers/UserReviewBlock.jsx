import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import
{
    getUserReviews,
} from '../adminReviews/adminReviewsSlice';
import StarRating from '../../../../services/starRating/StarRating';
import LoadingAnimation from '../../../../common-elements/loading/LoadingAnimation';

const UserReviewBlock = (props) =>
{
    const userId = props.userId;
    const dispatch = useDispatch();

    const {
        userReviews,
        loadingUserReviews,
    } = useSelector(state => state.adminReviews)


    useEffect(() =>
    {
        dispatch(getUserReviews(Number(userId)))
    }, [])

    if (loadingUserReviews)
    {
        return <LoadingAnimation />
    }

    return (
        <Fragment>
            <div className='review-div'>
                <label className='review-title'>Відгуки {userReviews?.length}</label>
                <div className='review-body' id='scrollbar-style-1'>
                    {
                        userReviews?.map((review) => (

                            <div className='review-row' key={review?.id}>

                                <div className="review-header">
                                    <img src={review?.productPictureAddress} alt={review?.productName} className='review-img'></img>
                                    <label>{review?.productName}</label>
                                    <label>{review?.productCode}</label>
                                </div>

                                <label>
                                    <StarRating filledStars={review?.numberOfStars} />
                                </label>

                                <div className='review-review' id='scrollbar-style-1'>

                                    <label>
                                        {review?.comment}
                                    </label>

                                    <label className='review-info-time'>
                                        <span></span>
                                        <span>
                                            {new Date(review?.date).getDate()}.{new Date(review?.date).getMonth() + 1}.{new Date(review?.date).getFullYear()}
                                        </span>
                                    </label>

                                </div>

                            </div>
                        ))}
                </div>
            </div>
        </Fragment>
    )
}

export default UserReviewBlock;


