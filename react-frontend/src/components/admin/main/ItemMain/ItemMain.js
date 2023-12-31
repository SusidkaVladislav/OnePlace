import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemMainStyle.css';
import SearchIcon from './svg/SearchIcon';
import BellIcon from './svg/BellIcon';
import ArrowDown from './svg/ArrowDown';

const ItemMain =({size})=>{
  const divStyle = {
    marginLeft: `${size}`,
  };

  const [isOpen, setIsOpen] = useState(false);
  const options = ['День', 'Тиждень', 'Місяць', 'Квартал','Півроку'];
  const [selectedItem, setSelectedItem] = useState(options[0]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };
  

  const handleClick1 = () => {};
  const handleClick2 = () => {};
  const handleClick3 = () => {};
  const handleClick4 = () => {};
    return (
      <div style={divStyle}>
        <div className='header-icons' >
          <div className='main-search-icon'>
            <SearchIcon/>
          </div>
          <div className='main-bell-icon'>
            <BellIcon/>
          </div>
          <div className={`dropdown-header ${isOpen ? 'open' : ''}`} onClick={handleToggleDropdown}>
          
            <label className='main-select-item'>{selectedItem}</label>
            <label className='main-arrow-down'><ArrowDown/></label>
            {isOpen && (
              <div className="dropdown-list">
                {options.map((item, index) => (
                  <label
                    key={index}
                    className={`dropdown-item ${selectedItem === item ? 'selected' : ''}`}
                    onClick={() => handleItemClick(item)}>
                    {item}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='main-body' >

          <div className='component-one'
          onClick={() => handleClick1}>

          </div>
          <div className='component-one'
          onClick={() => handleClick2}>

          </div>
          <div className='component-one'
          onClick={() => handleClick3}>

          </div>
          <div className='component-one'
          onClick={() => handleClick4}>

          </div>
        </div>
      </div>
    );
  
};

export default ItemMain;