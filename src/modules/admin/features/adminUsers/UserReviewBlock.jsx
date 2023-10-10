import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOrdersByUserId } from '../adminOrders/adminOrdersSlice';
import { fetchReviewReplies, fetchReviews,fetchPostReview } from '../adminReviews/adminReviewsSlice';
import StarRating from '../../../../services/starRating/StarRating';
import FluentArrowIcon from '../../components/MenuItems/ItemUser/svg/FluentArrowIcon';
import ArrowDownDark from '../../components/MenuItems/ItemUser/svg/ArrowDownDark';

const UserReviewBlock = (prop) =>
{
    const userId = prop.userId;
    const dispatch = useDispatch();

    const date=new Date();
    const [count, setCount] = useState(0);
    const [message,setMessage]=useState('');
    const [isReply,setIsReply]=useState(false);
    const [countReviews, setCountReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const { reviews } = useSelector(state => state.adminReviews)
    const {replies}=useSelector(state => state.adminReviews);

    const handleShowMessage = (review) => {
        setSelectedReview(review);
        //console.log(review);
    };
    const handleCloseMessage = () => {
        setSelectedReview(null);
        setCount(0);
    };

    const handleSendAnswer=(id)=>
    {
        if(message!==''&&message.length>4)
        {
            const reviewID = id;
            const comment = message;

            const reviewPostData = {
                reviewId: reviewID,
                comment: comment,
                date:date,
            };

            dispatch(fetchPostReview(reviewPostData))
            .then(()=>{
                dispatch(fetchReviewReplies());
            })
            //console.log(reviewPostData);
        }
        else{
            setIsReply(true)
        }


    }


    useEffect(() =>
    {
        dispatch(fetchReviews());
        dispatch(fetchReviewReplies())
        const countOfReviews=reviews.filter((review) =>review.userId===userId);
        setCountReviews(countOfReviews.length);
        //console.log(reviews);
    }, [])

    return (
        <div>
            <div className='review-div'>
                <div className='review-label'>
                    <label>Відгуки </label><label className='review-count'> {countReviews}</label>
                </div>
                <div className='review-body' id='scrollbar-style-1'>
                        
                    {reviews.map((review)=>(
                        userId===review.userId?(  
                        <div className='review-row' key={review.id}>
                            <div className="review-header">
                                <img src={review.productPictureAddress} alt={review.productName} className='review-img' width={50} height={50}></img>
                                <div className='review-title'><label>{review.productName}  {review.productCode}</label></div>
                                {!replies.some((reply) => reply.reviewId === review.id) && (
                                    <label className='review-fluent' onClick={() => handleShowMessage(review)}>
                                        <FluentArrowIcon />
                                    </label>
                                )}
                            </div>
                            <div className='star-rating'>
                                <StarRating filledStars={review.numberOfStars} />
                            </div>
                            <div className='review-review' id='scrollbar-style-1'>
                                <label>
                                    {review.comment}
                                </label>
                            </div>
                            <div className='review-date'>
                                <label>
                                    {review.date}
                                </label>
                            </div>
                                {replies.some((reply) => reply.reviewId === review.id) && (
                                    <div className='msg-from-admin' id='scrollbar-style-1'>
                                        <label> {replies.find((reply) => reply.reviewId === review.id).comment}</label>
                                        <br/><br/>
                                        <label> {replies.find((reply) => reply.reviewId === review.id).date}</label>
                                    </div>
                                )}
                            <div className='review-bottom-line'></div>
                        </div>):null
                    ))}
                </div>
            </div>
            
                {selectedReview && (
                    !replies.some((reply) => reply.reviewId === selectedReview.id) && (
                    <div className='review-message'>
                        <div>
                            <div className='review-message-label'>
                                <img src={selectedReview.productPictureAddress} alt={selectedReview.productName} className='review-img' width={50} height={50}></img>
                                <div className='review-title'><label>{selectedReview.productName} {selectedReview.productCode}</label></div>
                                <label className='textarea-count'>{count}/300</label>
                            </div>
                            <div className='review-message-input'>
                                <textarea type='textarea' maxLength={300} onChange={e => {setCount(e.target.value.length);setMessage(e.target.value);setIsReply(false)}}/>
            
                            </div>
                            <div className='review-message-send'>
                                <div className='error-reply'>
                                    {isReply&&(
                                    <label>*Некоректне повідомлення</label>)}
                                </div>
                                <label className='review-send' onClick={()=>handleSendAnswer(selectedReview.id)}>Відповісти</label>
                            </div>
                            </div>
                            <div className='arrow-toLeft'>
                            <label className='code-main-arrow-down' onClick={handleCloseMessage}><ArrowDownDark /></label>
                        </div>
                    </div>
                    )
                )}
        </div>
        
    )
}

export default UserReviewBlock;


