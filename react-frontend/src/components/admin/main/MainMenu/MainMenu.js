import React, { useState } from 'react';
import './MainMenuStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemMenuIcon1 from '../../../icons/ItemMenuIcon1';
import ItemMenuIcon2 from '../../../icons/ItemMenuIcon2';
import ItemMenuIcon3 from '../../../icons/ItemMenuIcon3';

import ItemMain from '../ItemMain/ItemMain';
import ItemSales from '../ItemSales/ItemSales';

const MainMenu = () => {
  const [count, setCount] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (index) => {
    setClickedIndex(index);
    setCount(index)
  };
  

  return (
    <div>
      <div className='main-menu'>
          <div className='menu-item-main'>
              <div className='item-main'>
              </div>
              <li
                className={hoveredIndex === 0 ? 'hovered' : ''}
                onClick={() => handleClick(0)}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}>
                  {clickedIndex === 0 ? <ItemMenuIcon3 /> : (hoveredIndex === 0 ? <ItemMenuIcon2 /> : <ItemMenuIcon1 />)}
                </li>
          </div>
          
      </div>
      <div className='body-by-item'>
          {count==='0' &&<ItemMain item={count}/>}
          {count==='1' &&<ItemSales item={count}/>}
          
      </div>
    </div>
  );
};

export default MainMenu;