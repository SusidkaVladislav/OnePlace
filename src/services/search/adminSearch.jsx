import React, { useState } from 'react';

import SearchIcon from '../../svg/shared-icons/SearchIcon';

import './adminSearchStyle.css';

const AdminSearch = props =>
{
    const {
        onSearchChange
    } = props;

    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);


    const handleIconHover = () =>
    {
        setIsHovered(true);
        setIsFocused(true);
    };

    const handleIconLeave = () =>
    {
        setIsHovered(false);
        setIsFocused(false);
    };

    const handleInputFocus = () =>
    {
        setIsFocused(true);
    };

    const handleInputBlur = () =>
    {
        setIsFocused(false);
    };

    const handleInputChange = (event) =>
    {
        onSearchChange(event.target.value);
    };

    return (
        <div className="search-div">
            <div
                className={`search-button ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={handleIconHover}
                onMouseLeave={handleIconLeave}
            > <SearchIcon />
            </div>
            <div className='search-field-div'>
                <input
                    className={`search-field ${isFocused ? 'focused' : ''}`}
                    type="text"
                    placeholder="Search..."
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onClick={() => setIsFocused(true)}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default AdminSearch;