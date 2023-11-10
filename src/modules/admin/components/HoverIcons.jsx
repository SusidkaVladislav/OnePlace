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

import UsersActiveIcon from '../../../svg/main-panel-icons/users/pure-icons/UsersActiveIcon';
import UsersIcon from '../../../svg/main-panel-icons/users/pure-icons/UsersIcon';
import SalesActiveIcon from '../../../svg/main-panel-icons/sales/pure-icons/SalesActiveIcon';
import SalesIcon from '../../../svg/main-panel-icons/sales/pure-icons/SalesIcon';
import ReviewActiveIcon from '../../../svg/main-panel-icons/review/pure-icons/ReviewActiveIcon';
import ReviewIcon from '../../../svg/main-panel-icons/review/pure-icons/ReviewIcon';
import ProductActiveIcon from '../../../svg/main-panel-icons/product/pure-icons/ProductActiveIcon';
import ProductIcon from '../../../svg/main-panel-icons/product/pure-icons/ProductIcon';
import OrderActiveIcon from '../../../svg/main-panel-icons/order/pure-icons/OrderActiveIcon';
import OrerIcon from '../../../svg/main-panel-icons/order/pure-icons/OrderIcon';
import MessageIcon from '../../../svg/main-panel-icons/message/pure-icons/MessageIcon';
import MessageActiveIcon from '../../../svg/main-panel-icons/message/pure-icons/MessageActiveIcon';
import MainActiveIcon from '../../../svg/main-panel-icons/main/pure-icons/MainActiveIcon';
import MainIcon from '../../../svg/main-panel-icons/main/pure-icons/MainIcon';
import FilterIcon from '../../../svg/main-panel-icons/filter/pure-icons/FilterIcon';
import FilterActiveIcon from '../../../svg/main-panel-icons/filter/pure-icons/FilterActiveIcon';
import ExitIcon from '../../../svg/main-panel-icons/exit/pure-icons/ExitIcon';
import ExitActiveIcon from '../../../svg/main-panel-icons/exit/pure-icons/ExitActiveIcon';
import CategoryActiveIcon from '../../../svg/main-panel-icons/category/pure-icons/CategoryActiveIcon';
import CategoryIcon from '../../../svg/main-panel-icons/category/pure-icons/CategoryIcon';
import AddProductActiveIcon from '../../../svg/main-panel-icons/add-product/pure-icons/AddProductActiveIcon';
import AddProductIcon from '../../../svg/main-panel-icons/add-product/pure-icons/AddProductIcon';

//#endregion

import { Link } from 'react-router-dom'

const HOVER_ICON_COLOR = '#DA8D33'
const DEFAULT_ICON_COLOR = '#471915'

const HoverIcon = (props) =>
{

    const {
        isPanelOpened
    } = props;

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [clickedIndex, setClickedIndex] = useState(null);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

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

    const handleConfirmExit = () =>
    {
        localStorage.clear();
        window.location.reload();
        setIsConfirmDialogVisible(false);
    };

    const handleCancelExit = () =>
    {
        setIsConfirmDialogVisible(false);
    };

    return (

        <div className='left-menu-items'
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: !isPanelOpened && 'center',
            }}
        >
            <div className='menu-item-main'>

                <Link
                    to=""
                    className={hoveredIndex === 0 ? 'hovered' : ''}
                    onClick={() => handleClick(0)}
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}
                >
                    {
                        isPanelOpened
                            ? (
                                clickedIndex === 0
                                    ? <MainWithTextActiveIcon />
                                    : (hoveredIndex === 0
                                        ? <MainWithTextIcon color={HOVER_ICON_COLOR} />
                                        : <MainWithTextIcon color={DEFAULT_ICON_COLOR} />)
                            )
                            : (
                                clickedIndex === 0
                                    ? <MainActiveIcon />
                                    : (hoveredIndex === 0
                                        ? <MainIcon color={HOVER_ICON_COLOR} />
                                        : <MainIcon color={DEFAULT_ICON_COLOR} />)
                            )
                    }


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

                    {
                        isPanelOpened
                            ? (
                                clickedIndex === 1
                                    ? <SalesWithTextActiveIcon />
                                    : (hoveredIndex === 1
                                        ? <SalesWithTextIcon color={HOVER_ICON_COLOR} />
                                        : <SalesWithTextIcon color={DEFAULT_ICON_COLOR} />)
                            ) : (
                                clickedIndex === 1
                                    ? <SalesActiveIcon /> :
                                    (hoveredIndex === 1
                                        ? <SalesIcon color={HOVER_ICON_COLOR} /> :
                                        <SalesIcon color={DEFAULT_ICON_COLOR} />)
                            )
                    }

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
                    {
                        isPanelOpened
                            ? (
                                clickedIndex === 2
                                    ? <OrderWithTextActiveIcon />
                                    : (hoveredIndex === 2 ? <OrerWithTextIcon color={HOVER_ICON_COLOR} />
                                        : <OrerWithTextIcon color={DEFAULT_ICON_COLOR} />)
                            ) : (
                                clickedIndex === 2
                                    ? <OrderActiveIcon />
                                    : (hoveredIndex === 2 ? <OrerIcon color={HOVER_ICON_COLOR} />
                                        : <OrerIcon color={DEFAULT_ICON_COLOR} />)
                            )
                    }
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
                    {
                        isPanelOpened
                            ? (
                                clickedIndex === 3
                                    ? <UsersWithTextActiveIcon />
                                    : (hoveredIndex === 3 ? <UsersWithTextIcon color={HOVER_ICON_COLOR} />
                                        : <UsersWithTextIcon color={DEFAULT_ICON_COLOR} />)
                            ) : (
                                clickedIndex === 3
                                    ? <UsersActiveIcon />
                                    : (hoveredIndex === 3 ? <UsersIcon color={HOVER_ICON_COLOR} />
                                        : <UsersIcon color={DEFAULT_ICON_COLOR} />)
                            )
                    }
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
                    {
                        isPanelOpened
                            ? (
                                clickedIndex === 4
                                    ? <MessageWithTextActiveIcon />
                                    : (hoveredIndex === 4 ? <MessageWithTextIcon color={HOVER_ICON_COLOR} />
                                        : <MessageWithTextIcon color={DEFAULT_ICON_COLOR} />)
                            ) : (
                                clickedIndex === 4 ?
                                    <MessageActiveIcon />
                                    : (hoveredIndex === 4 ? <MessageIcon color={HOVER_ICON_COLOR} />
                                        : <MessageIcon color={DEFAULT_ICON_COLOR} />)
                            )
                    }
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
                        {
                            isPanelOpened
                                ? (
                                    clickedIndex === 5
                                        ? <ProductWithTextActiveIcon />
                                        : (hoveredIndex === 5 ? <ProductWithTextIcon color={HOVER_ICON_COLOR} />
                                            : <ProductWithTextIcon color={DEFAULT_ICON_COLOR} />)
                                ) : (
                                    clickedIndex === 5 ?
                                        <ProductActiveIcon />
                                        : (hoveredIndex === 5 ? <ProductIcon color={HOVER_ICON_COLOR} />
                                            : <ProductIcon color={DEFAULT_ICON_COLOR} />)
                                )
                        }
                    </Link>
                    <span
                        onClick={() => { setShowAddProduct(!showAddProduct) }}
                        style={{ cursor: 'pointer' }}
                    >
                        {
                            isPanelOpened
                                ? (
                                    showAddProduct ? <BlueSmallToTopArrow /> : <BrownSmallToBottomArrow />
                                ) : ''
                        }
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
                        {
                            isPanelOpened
                                ? (
                                    clickedIndex === 10 ?
                                        <AddProductWithTextActiveIcon />
                                        : (hoveredIndex === 10 ? <AddProductWithTextIcon color={HOVER_ICON_COLOR} />
                                            : <AddProductWithTextIcon color={DEFAULT_ICON_COLOR} />)
                                ) : (
                                    clickedIndex === 10
                                        ? <AddProductActiveIcon />
                                        : (hoveredIndex === 10 ? <AddProductIcon color={HOVER_ICON_COLOR} />
                                            : <AddProductIcon color={DEFAULT_ICON_COLOR} />)
                                )
                        }
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
                    {
                        isPanelOpened
                            ? (
                                clickedIndex === 6
                                    ? <CategoryWithTextActiveIcon />
                                    : (hoveredIndex === 6 ? <CategoryWithTextIcon color={HOVER_ICON_COLOR} />
                                        : <CategoryWithTextIcon color={DEFAULT_ICON_COLOR} />)
                            ) : (
                                clickedIndex === 6
                                    ? <CategoryActiveIcon />
                                    : (hoveredIndex === 6 ? <CategoryIcon color={HOVER_ICON_COLOR} />
                                        : <CategoryIcon color={DEFAULT_ICON_COLOR} />)
                            )
                    }
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
                    {
                        isPanelOpened
                            ? (
                                clickedIndex === 7
                                    ? <ReviewWithTextActiveIcon />
                                    : (hoveredIndex === 7 ? <ReviewWithTextIcon color={HOVER_ICON_COLOR} />
                                        : <ReviewWithTextIcon color={DEFAULT_ICON_COLOR} />)
                            ) : (
                                clickedIndex === 7
                                    ? <ReviewActiveIcon />
                                    : (hoveredIndex === 7
                                        ? <ReviewIcon color={HOVER_ICON_COLOR} />
                                        : <ReviewIcon color={DEFAULT_ICON_COLOR} />)
                            )
                    }
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
                    {
                        isPanelOpened
                            ? (
                                clickedIndex === 8
                                    ? <FilterWithTextActiveIcon />
                                    : (hoveredIndex === 8 ? <FilterWithTextIcon color={HOVER_ICON_COLOR} />
                                        : <FilterWithTextIcon color={DEFAULT_ICON_COLOR} />)
                            ) : (
                                clickedIndex === 8
                                    ? <FilterActiveIcon />
                                    : (hoveredIndex === 8 ? <FilterIcon color={HOVER_ICON_COLOR} />
                                        : <FilterIcon color={DEFAULT_ICON_COLOR} />)
                            )
                    }
                </Link>
            </div>
            <div className='menu-item-main'>

                <div
                    style={{
                        cursor: 'pointer',
                    }}
                    className={hoveredIndex === 9 ? 'hovered' : ''}
                    onClick={() =>
                    {
                        setIsConfirmDialogVisible(true);
                    }}
                    onMouseEnter={() => handleMouseEnter(9)}
                    onMouseLeave={handleMouseLeave}>
                    {
                        isPanelOpened
                            ? (
                                clickedIndex === 9
                                    ? <ExitWithTextActiveIcon />
                                    : (hoveredIndex === 9 ? <ExitWithTextIcon color={HOVER_ICON_COLOR} />
                                        : <ExitWithTextIcon color={DEFAULT_ICON_COLOR} />)
                            ) : (
                                clickedIndex === 9
                                    ? <ExitActiveIcon />
                                    : (hoveredIndex === 9
                                        ? <ExitIcon color={HOVER_ICON_COLOR} />
                                        : <ExitIcon color={DEFAULT_ICON_COLOR} />)
                            )
                    }
                </div>
            </div>

            {
                isConfirmDialogVisible && (
                    <div className='modal-backdrop'>
                        <div className='confirm-dialog'>
                            <p>Ви впевнені, що бажаєте вийти?</p>
                            <label className='confirm-buttom' onClick={handleConfirmExit}>Так</label>
                            <label className='confirm-buttom' onClick={handleCancelExit}>Ні</label>
                        </div>
                    </div>
                )
            }

        </div>
    );
}

export default HoverIcon;