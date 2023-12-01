import React, {useState, useEffect} from 'react';

import FilledStar from '../../../svg/client-icons/productPage/FilledStar';
import UnfilledStar from '../../../svg/client-icons/productPage/UnfilledStar';

const StarRating = ({defaultRating, onRatingChange}) => {
    const [rating, setRating] = useState(defaultRating);

    useEffect(() => {
        setRating(defaultRating);
      }, [defaultRating]);

    const handleRatingClick = (value) => {
        setRating(value);
        if (onRatingChange) {
          onRatingChange(value); 
        }
    };

    const stars = [];
    const maxRating = 5;

    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
          stars.push(
            <div key={i} onClick={() => handleRatingClick(i)} style={{display:"inline"}}>
                <FilledStar/>
            </div>
          );
        } else {
          stars.push(
            <div key={i} onClick={() => handleRatingClick(i)} style={{display:"inline"}}>
            <UnfilledStar/>
            </div>
          );
        }
    }

    return (
        <div style={{display:"inline"}}>
            {stars}
        </div>
    );
}

export default StarRating;