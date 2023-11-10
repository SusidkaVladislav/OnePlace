import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import
{
    getReviews
} from '../adminReviews/adminReviewsSlice';
import StarRating from '../../../../services/starRating/StarRating';

const UserReviewBlock = (prop) =>
{
    const userId = prop.userId;
    const dispatch = useDispatch();


    const [countReviews, setCountReviews] = useState([]);

    const { reviews } = useSelector(state => state.adminReviews)


    useEffect(() =>
    {
        dispatch(getReviews());
        const countOfReviews = reviews.filter((review) => review.userId === userId);
        setCountReviews(countOfReviews.length);
    }, [])

    return (
        <Fragment>
            <div className='review-div'>
                <label className='review-title'>Відгуки {countReviews}</label>
                <div className='review-body' id='scrollbar-style-1'>
                    {
                        reviews.map((review) => (
                            userId === review.userId ? (
                                <div className='review-row' key={review.id}>

                                    <div className="review-header">
                                        <img src={review.productPictureAddress} alt={review.productName} className='review-img'></img>
                                        <label>{review.productName}</label>
                                        <label>{review.productCode}</label>
                                    </div>

                                    <label>
                                        <StarRating filledStars={review.numberOfStars} />
                                    </label>

                                    <div className='review-review' id='scrollbar-style-1'>
                                        
                                        <label>
                                            {review.comment}
                                        </label>
                                        
                                        <label className='review-info-time'>
                                            <span>
                                                {new Date(review.date).getDate()}.{new Date(review.date).getMonth() + 1}.{new Date(review.date).getFullYear()}
                                            </span>
                                            <span>
                                                {new Date(review.date).getHours()}:{new Date(review.date).getMinutes()}
                                            </span>
                                        </label>
                                    
                                    </div>

                                </div>) : null
                        ))}
                </div>
            </div>
        </Fragment>
    )
}

export default UserReviewBlock;


