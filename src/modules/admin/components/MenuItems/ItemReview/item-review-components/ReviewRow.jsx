import React from 'react';
import { useNavigate } from 'react-router-dom';
import CurvedBrownArrow from '../../../../../../svg/arrows/CurvedBrownArrow';
import MessageComeIndicator from '../../../../../../svg/shared-icons/MessageComeIndicator';
import GreenCheckCheckboxIcon from '../../../../../../svg/shared-icons/GreenCheckCheckboxIcon';

const ReviewRow = (props) =>
{
    const {
        reviewId,
        reviewProductPictureAddress,
        reviewProductName,
        reviewComment,
        reviewDate,
        handleChecked,
        reviewsReply,
        checkedUsers,
    } = props;

    const navigate = useNavigate();

    return (
        <div className='review-div-row' key={reviewId}>
            <div>
                <label className="message-custom-checkbox">
                    <input
                        id={reviewId}
                        type="checkbox"
                        checked={checkedUsers.includes(reviewId)}
                        onChange={() => handleChecked(reviewId)} />
                    <span className='message-custom-checkbox-checkmark'><GreenCheckCheckboxIcon /></span>
                </label>
            </div>

            <div className='message-product-img'>
                <img src={reviewProductPictureAddress} alt={reviewProductName} />
                {!reviewsReply.some((reply) => reply.review.id === reviewId) && (
                    <label key={reviewId} className='review-elipse-icon'><MessageComeIndicator /></label>
                )}
            </div>

            <div className='review-product-name-label'>
              {reviewProductName}
            </div>

            <div className='review-comment'>
                {reviewComment}
            </div>

            <label className='review-date-label'>{new Date(reviewDate).toLocaleDateString()} {new Date(reviewDate).toLocaleTimeString()}</label>
            <div style={{
                'cursor': 'pointer',
            }} onClick={async event => { navigate(`review/${reviewId}`); }}>

                <CurvedBrownArrow />
            </div>
        </div>
    )
}

export default ReviewRow;