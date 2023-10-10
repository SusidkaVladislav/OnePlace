import React, { useState } from 'react';

//#region Icons
import ItemMenuIcon1 from '../svg/mainPanelIcons/ItemMenuIcon1';
import ItemMenuIcon2 from '../svg/mainPanelIcons/ItemMenuIcon2';
import ItemMenuIcon3 from '../svg/mainPanelIcons/ItemMenuIcon3';
import ItemSalesIcon1 from '../svg/mainPanelIcons/ItemSalesIcon1';
import ItemSalesIcon2 from '../svg/mainPanelIcons/ItemSalesIcon2';
import ItemSalesIcon3 from '../svg/mainPanelIcons/ItemSalesIcon3';
import ItemOrderIcon1 from '../svg/mainPanelIcons/ItemOrderIcon1';
import ItemOrderIcon2 from '../svg/mainPanelIcons/ItemOrderIcon2';
import ItemOrderIcon3 from '../svg/mainPanelIcons/ItemOrderIcon3';
import ItemUserIcon1 from '../svg/mainPanelIcons/ItemUserIcon1';
import ItemUserIcon2 from '../svg/mainPanelIcons/ItemUserIcon2';
import ItemUserIcon3 from '../svg/mainPanelIcons/ItemUserIcon3';
import ItemMessageIcon1 from '../svg/mainPanelIcons/ItemMessageIcon1';
import ItemMessageIcon2 from '../svg/mainPanelIcons/ItemMessageIcon2';
import ItemMessageIcon3 from '../svg/mainPanelIcons/ItemMessageIcon3';
import ItemProductIcon1 from '../svg/mainPanelIcons/ItemProductIcon1';
import ItemProductIcon2 from '../svg/mainPanelIcons/ItemProductIcon2';
import ItemProductIcon3 from '../svg/mainPanelIcons/ItemProductIcon3';
import ItemCategoryIcon1 from '../svg/mainPanelIcons/ItemCategoryIcon1';
import ItemCategoryIcon2 from '../svg/mainPanelIcons/ItemCategoryIcon2';
import ItemCategoryIcon3 from '../svg/mainPanelIcons/ItemCategoryIcon3';
import ItemExitIcon1 from '../svg/mainPanelIcons/ItemExitIcon1';
import ItemExitIcon2 from '../svg/mainPanelIcons/ItemExitIcon2';
import ItemExitIcon3 from '../svg/mainPanelIcons/ItemExitIcon3';
import ItemReviewIcon1 from '../svg/mainPanelIcons/ItemReviewIcon1';
import ItemReviewIcon2 from '../svg/mainPanelIcons/ItemReviewIcon2';
import ItemReviewIcon3 from '../svg/mainPanelIcons/ItemReviewIcon3';
import ItemFilterIcon1 from '../svg/mainPanelIcons/ItemFilterIcon1';
import ItemFilterIcon2 from '../svg/mainPanelIcons/ItemFilterIcon2';
import ItemFilterIcon3 from '../svg/mainPanelIcons/ItemFilterIcon3';
import BlackArrowOpenIcon from '../svg/sharedIcons/BlackArrowOpenIcon';
import BlackArrowCloseIcon from '../svg/sharedIcons/BlackArrowCloseIcon';
import ItemAddProductIcon1 from '../svg/mainPanelIcons/ItemAddProductIcon1';
import ItemAddProductIcon2 from '../svg/mainPanelIcons/ItemAddProductIcon2';
import ItemAddProductIcon3 from '../svg/mainPanelIcons/ItemAddProductIcon3';
//#endregion

import { Link } from 'react-router-dom'

const HoverIcon = () =>
{
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [clickedIndex, setClickedIndex] = useState(null);

    const [showAddProduct, setShowAddProduct] = useState(false);

    const handleClick = (index) =>
    {
        setClickedIndex(index);
    };

    const handleMouseEnter = (index) =>
    {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () =>
    {
        setHoveredIndex(null)
    };

    return (

        <div className='left-menu-items' >
            <div className='menu-item-main'>

                <Link
                    to=""
                    className={hoveredIndex === 0 ? 'hovered' : ''}
                    onClick={() => handleClick(0)}
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}
                >
                    {clickedIndex === 0 ? <ItemMenuIcon3 /> : (hoveredIndex === 0 ? <ItemMenuIcon2 /> : <ItemMenuIcon1 />)}
                </Link>
            </div>
            <div className='menu-item-main'>

                <Link
                    to="sales"
                    className={hoveredIndex === 1 ? 'hovered' : ''}
                    onClick={() => handleClick(1)}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                >
                    {clickedIndex === 1 ? <ItemSalesIcon3 /> : (hoveredIndex === 1 ? <ItemSalesIcon2 /> : <ItemSalesIcon1 />)}
                </Link>
            </div>
            <div className='menu-item-main'>

                <Link
                    to="orders"
                    className={hoveredIndex === 2 ? 'hovered' : ''}
                    onClick={() => handleClick(2)}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                >
                    {clickedIndex === 2 ? <ItemOrderIcon3 /> : (hoveredIndex === 2 ? <ItemOrderIcon2 /> : <ItemOrderIcon1 />)}
                </Link>
            </div>
            <div className='menu-item-main'>

                <Link
                    to="users"
                    className={hoveredIndex === 3 ? 'hovered' : ''}
                    onClick={() => handleClick(3)}
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={handleMouseLeave}
                >
                    {clickedIndex === 3 ? <ItemUserIcon3 /> : (hoveredIndex === 3 ? <ItemUserIcon2 /> : <ItemUserIcon1 />)}
                </Link>
            </div>
            <div className='menu-item-main'>

                <Link
                    to="messages"
                    className={hoveredIndex === 4 ? 'hovered' : ''}
                    onClick={() => handleClick(4)}
                    onMouseEnter={() => handleMouseEnter(4)}
                    onMouseLeave={handleMouseLeave}
                >
                    {clickedIndex === 4 ? <ItemMessageIcon3 /> : (hoveredIndex === 4 ? <ItemMessageIcon2 /> : <ItemMessageIcon1 />)}
                </Link>
            </div>

            <div className='menu-item-main'>
                <div className='menu-item-product-container'>
                    <Link
                        to="products"
                        className={hoveredIndex === 5 ? 'hovered' : ''}
                        onClick={() => handleClick(5)}
                        onMouseEnter={() => handleMouseEnter(5)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {clickedIndex === 5 ? <ItemProductIcon3 /> : (hoveredIndex === 5 ? <ItemProductIcon2 /> : <ItemProductIcon1 />)}
                    </Link>
                    <span
                        onClick={() => { setShowAddProduct(!showAddProduct) }}
                        style={{ cursor: 'pointer' }}
                    >
                        {showAddProduct ? <BlackArrowCloseIcon /> : <BlackArrowOpenIcon />}
                    </span>
                </div>
            </div>

            {showAddProduct &&
                <div className='menu-item-main'>
                    <Link
                        to="add-product"
                        className={hoveredIndex === 10 ? 'hovered' : ''}
                        onClick={() => handleClick(10)}
                        onMouseEnter={() => handleMouseEnter(10)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {clickedIndex === 10 ? <ItemAddProductIcon3 /> : (hoveredIndex === 10 ? <ItemAddProductIcon2 /> : <ItemAddProductIcon1 />)}
                    </Link>
                </div>
            }

            <div className='menu-item-main'>

                <Link
                    to="categories"
                    className={hoveredIndex === 6 ? 'hovered' : ''}
                    onClick={() => handleClick(6)}
                    onMouseEnter={() => handleMouseEnter(6)}
                    onMouseLeave={handleMouseLeave}
                >
                    {clickedIndex === 6 ? <ItemCategoryIcon3 /> : (hoveredIndex === 6 ? <ItemCategoryIcon2 /> : <ItemCategoryIcon1 />)}
                </Link>
            </div>
            <div className='menu-item-main'>
                <div className='item-main'></div>
                <Link
                    to="reviews"
                    className={hoveredIndex === 7 ? 'hovered' : ''}
                    onClick={() => handleClick(7)}
                    onMouseEnter={() => handleMouseEnter(7)}
                    onMouseLeave={handleMouseLeave}
                >
                    {clickedIndex === 7 ? <ItemReviewIcon3 /> : (hoveredIndex === 7 ? <ItemReviewIcon2 /> : <ItemReviewIcon1 />)}
                </Link>
            </div>
            <div className='menu-item-main'>

                <Link
                    to="filters"
                    className={hoveredIndex === 8 ? 'hovered' : ''}
                    onClick={() => handleClick(8)}
                    onMouseEnter={() => handleMouseEnter(8)}
                    onMouseLeave={handleMouseLeave}
                >
                    {clickedIndex === 8 ? <ItemFilterIcon3 /> : (hoveredIndex === 8 ? <ItemFilterIcon2 /> : <ItemFilterIcon1 />)}
                </Link>
            </div>
            <div className='menu-item-main'>

                <Link
                    to="exit"
                    className={hoveredIndex === 9 ? 'hovered' : ''}
                    onClick={() => handleClick(9)}
                    onMouseEnter={() => handleMouseEnter(9)}
                    onMouseLeave={handleMouseLeave}>
                    {clickedIndex === 9 ? <ItemExitIcon3 /> : (hoveredIndex === 9 ? <ItemExitIcon2 /> : <ItemExitIcon1 />)}
                </Link>
            </div>
        </div>


    );
}

export default HoverIcon;