import React, { useState } from 'react';
import './ReviewStyle.css';


const StarRating = ({ value, onChange }) => {
  const [hoveredValue, setHoveredValue] = useState(0);

  const handleMouseEnter = (newValue) => {
    setHoveredValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoveredValue(0);
  };

  const handleClick = (newValue) => {
    onChange(newValue);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={`star ${index <= (hoveredValue || value) ? 'filled' : ''}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
  
};


export default StarRating;
