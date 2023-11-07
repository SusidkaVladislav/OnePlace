import React, { useState } from 'react';
import WhiteSmallToBottomArrow from '../../../../../svg/arrows/WhiteSmallToBottomArrow';
import AdminSearch from '../../../../../services/search//adminSearch';

import { useDispatch, useSelector } from 'react-redux';

const ItemSale = () =>
{
    const [isOpen, setIsOpen] = useState(false);
    const options = ['День', 'Тиждень', 'Місяць'];
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const optionsValues = [new Date().toDateString(), oneWeekAgo, oneMonthAgo];

    const [selectedItem, setSelectedItem] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    const handleToggleDropdown = () =>
    {
        setIsOpen(!isOpen);
    };

    const handleItemClick = async (item, value) =>
    {
        setSelectedItem(item);
        //await dispatch(getOrdersByDate(value));
        setIsOpen(false);
    };
    return (
        <div className='main-body'>
            <div className='main-body-header' >
                <AdminSearch
                    onSearchChange={value =>
                    {
                        setInputValue(value);
                        // setCurrentProductPage(1);
                    }}
                />
                <div
                    onClick={handleToggleDropdown}>
                    <div className={`dropdown-header ${isOpen ? 'open' : ''}`}>
                        <label>{selectedItem}</label>
                        <label><WhiteSmallToBottomArrow /></label>
                    </div>
                    {
                        isOpen && (
                            <div className="dropdown-list">
                                {
                                    options.map((item, index) => (
                                        <label
                                            key={index}
                                            className={`dropdown-item ${selectedItem === item ? 'selected' : ''}`}
                                            onClick={() => handleItemClick(item, optionsValues[index])}>
                                            {item}
                                        </label>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ItemSale