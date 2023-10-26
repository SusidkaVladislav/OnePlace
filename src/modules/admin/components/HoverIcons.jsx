import React, { useState } from 'react';

//#region Icons


import BrownSmallToBottomArrow from '../../../svg/arrows/BrownSmallToBottomArrow';


import BlueSmallToTopArrow from '../../../svg/arrows/BlueSmallToTopArrow';
import UsersWithTextActiveIcon from '../../../svg/main-panel-icons/users/icons-with-text/UsersWithTextActiveIcon';
import UsersWithTextIcon from '../../../svg/main-panel-icons/users/icons-with-text/UsersWithTextIcon';
import SalesWithTextActiveIcon from '../../../svg/main-panel-icons/sales/icons-with-text/SalesWithTextActiveIcon';
import SalesWithTextIcon from '../../../svg/main-panel-icons/sales/icons-with-text/SalesWithTextIcon';
import ReviewWithTextActiveIcon from '../../../svg/main-panel-icons/review/icons-with-text/ReviewWithTextActiveIcon';
import ReviewWithTextIcon from '../../../svg/main-panel-icons/review/icons-with-text/ReviewWithTextIcon';
import ProductWithTextActiveIcon from '../../../svg/main-panel-icons/product/icons-with-text/ProductWithTextActiveIcon';
import ProductWithTextIcon from '../../../svg/main-panel-icons/product/icons-with-text/ProductWithTextIcon';
import OrderWithTextActiveIcon from '../../../svg/main-panel-icons/order/icons-with-text/OrderWithTextActiveIcon';
import OrerWithTextIcon from '../../../svg/main-panel-icons/order/icons-with-text/OrerWithTextIcon';
import MessageWithTextIcon from '../../../svg/main-panel-icons/message/icons-with-text/MessageWithTextIcon';
import MessageWithTextActiveIcon from '../../../svg/main-panel-icons/message/icons-with-text/MessageWithTextActiveIcon';
import MainWithTextActiveIcon from '../../../svg/main-panel-icons/main/icons-with-text/MainWithTextActiveIcon';
import MainWithTextIcon from '../../../svg/main-panel-icons/main/icons-with-text/MainWithTextIcon';
import FilterWithTextIcon from '../../../svg/main-panel-icons/filter/icons-with-text/FilterWithTextIcon';
import FilterWithTextActiveIcon from '../../../svg/main-panel-icons/filter/icons-with-text/FilterWithTextActiveIcon';
import ExitWithTextIcon from '../../../svg/main-panel-icons/exit/icons-with-text/ExitWithTextIcon';
import ExitWithTextActiveIcon from '../../../svg/main-panel-icons/exit/icons-with-text/ExitWithTextActiveIcon';
import CategoryWithTextActiveIcon from '../../../svg/main-panel-icons/category/icons-with-text/CategoryWithTextActiveIcon';
import CategoryWithTextIcon from '../../../svg/main-panel-icons/category/icons-with-text/CategoryWithTextIcon';
import AddProductWithTextActiveIcon from '../../../svg/main-panel-icons/add-product/icons-with-text/AddProductWithTextActiveIcon';
import AddProductWithTextIcon from '../../../svg/main-panel-icons/add-product/icons-with-text/AddProductWithTextIcon';
//#endregion

import { Link } from 'react-router-dom'

const HOVER_ICON_COLOR = '#DA8D33'
const DEFAULT_ICON_COLOR = '#471915'

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
                    {clickedIndex === 0 ? <MainWithTextActiveIcon /> : (hoveredIndex === 0 ? <MainWithTextIcon color={HOVER_ICON_COLOR} /> : <MainWithTextIcon color={DEFAULT_ICON_COLOR} />)}
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
                    {clickedIndex === 1 ? <SalesWithTextActiveIcon /> : (hoveredIndex === 1 ? <SalesWithTextIcon color={HOVER_ICON_COLOR} /> : <SalesWithTextIcon color={DEFAULT_ICON_COLOR} />)}
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
                    {clickedIndex === 2 ? <OrderWithTextActiveIcon /> : (hoveredIndex === 2 ? <OrerWithTextIcon color={HOVER_ICON_COLOR} /> : <OrerWithTextIcon color={DEFAULT_ICON_COLOR} />)}
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
                    {clickedIndex === 3 ? <UsersWithTextActiveIcon /> : (hoveredIndex === 3 ? <UsersWithTextIcon color={HOVER_ICON_COLOR} /> : <UsersWithTextIcon color={DEFAULT_ICON_COLOR} />)}
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
                    {clickedIndex === 4 ? <MessageWithTextActiveIcon /> : (hoveredIndex === 4 ? <MessageWithTextIcon color={HOVER_ICON_COLOR} /> : <MessageWithTextIcon color={DEFAULT_ICON_COLOR} />)}
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
                        {clickedIndex === 5 ? <ProductWithTextActiveIcon /> : (hoveredIndex === 5 ? <ProductWithTextIcon color={HOVER_ICON_COLOR} /> : <ProductWithTextIcon color={DEFAULT_ICON_COLOR} />)}
                    </Link>
                    <span
                        onClick={() => { setShowAddProduct(!showAddProduct) }}
                        style={{ cursor: 'pointer' }}
                    >
                        {showAddProduct ? <BlueSmallToTopArrow /> : <BrownSmallToBottomArrow />}
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
                        {clickedIndex === 10 ? <AddProductWithTextActiveIcon /> : (hoveredIndex === 10 ? <AddProductWithTextIcon color={HOVER_ICON_COLOR} /> : <AddProductWithTextIcon color={DEFAULT_ICON_COLOR} />)}
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
                    {clickedIndex === 6 ? <CategoryWithTextActiveIcon /> : (hoveredIndex === 6 ? <CategoryWithTextIcon color={HOVER_ICON_COLOR} /> : <CategoryWithTextIcon color={DEFAULT_ICON_COLOR} />)}
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
                    {clickedIndex === 7 ? <ReviewWithTextActiveIcon /> : (hoveredIndex === 7 ? <ReviewWithTextIcon color={HOVER_ICON_COLOR} /> : <ReviewWithTextIcon color={DEFAULT_ICON_COLOR} />)}
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
                    {clickedIndex === 8 ? <FilterWithTextActiveIcon /> : (hoveredIndex === 8 ? <FilterWithTextIcon color={HOVER_ICON_COLOR} /> : <FilterWithTextIcon color={DEFAULT_ICON_COLOR} />)}
                </Link>
            </div>
            <div className='menu-item-main'>

                <Link
                    to="exit"
                    className={hoveredIndex === 9 ? 'hovered' : ''}
                    onClick={() => handleClick(9)}
                    onMouseEnter={() => handleMouseEnter(9)}
                    onMouseLeave={handleMouseLeave}>
                    {clickedIndex === 9 ? <ExitWithTextActiveIcon /> : (hoveredIndex === 9 ? <ExitWithTextIcon color={HOVER_ICON_COLOR} /> : <ExitWithTextIcon color={DEFAULT_ICON_COLOR} />)}
                </Link>
            </div>
        </div>


    );
}

export default HoverIcon;