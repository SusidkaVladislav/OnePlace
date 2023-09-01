import './ReviewStyle.css';
import {FaStar} from 'react-icons/fa';


function StarRating ({ filledStars }){

  const maxStars = 5;

  return (
    <div className="star-rating">
      {[...Array(maxStars)].map((_, index) => {
        const currentRating = index + 1;
        const isFilled = currentRating <= filledStars;
        return (
          <label key={index} className='star-label'>
            <input className='stars-input'
              type="radio"
              name="rating"
              value={currentRating}
              readOnly
              checked={isFilled}
            />

            <FaStar
              className="star"
              size={26}
              color={isFilled ? "#ffc107" : "#e4e5e9"}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
