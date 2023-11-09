import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import WhiteSmallToBottomArrow from '../../../../../svg/arrows/WhiteSmallToBottomArrow';
import AdminSearch from '../../../../../services/search//adminSearch';
import RecursedCombo from '../../../controls/recursed-combo-box/RecursedCombo';

import './ItemSaleStyles.css';

import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesForSelect } from '../../../features/adminCategory/adminCategorySlice';
import
{
    getProductSaleInfo,
    setCategory,
    getFilteredSales,
} from '../../../features/adminSale/adminSaleSlice';

import
{
    setCategoryValid
} from '../../../features/adminProduct/adminProductSlice';

import LoadingIcon from '../../../../../svg/animations/LoadingAnimation.gif';
import SuccessfulNotification from '../../../controls/notifications/SuccessfulNotification';
import UnsuccessfulNotification from '../../../controls/notifications/UnsuccessfulNotification';
import CustomPagination from '../../../../../services/pagination/CustomPagination';

const PageSize = 8;
const ItemSale = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentSalesPage, setCurrentSalesPage] = useState(1);

    const [isOpen, setIsOpen] = useState(false);
    const options = ['Сьогодні', 'Тиждень', 'Місяць'];
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const optionsValues = [new Date().toDateString(), oneWeekAgo, oneMonthAgo];

    const [selectedItem, setSelectedItem] = useState(options[0]);
    const [selectedOptionValue, setSelectedOptionValue] = useState(optionsValues[0])

    const [inputValue, setInputValue] = useState('');

    const {
        loading,
        category,
        sales,
        successfulAlertShow,
        unsuccessfulAlertShow,
        actionNotification,
    } = useSelector(state => state.adminSales);

    const [categoryLoading, setCategoryLoading] = useState(false)
    const { categoriesForSelect } = useSelector(state => state.adminCategories);
    var mainCategories = useRef([]);
    var subCategories = useRef([]);

    const filteredData = useSelector(state => getFilteredSales(state, inputValue));

    useEffect(() =>
    {
        dispatch(setCategoryValid(true));
        dispatch(getCategoriesForSelect())
            .then((response) =>
            {
                const categoriesForSelect = response.payload;
                mainCategories.current = categoriesForSelect.filter((category) => category.parentCategoryId === null);
                subCategories.current = categoriesForSelect.filter((category) => category.parentCategoryId !== null);
                setCategoryLoading(true);
            })
            .catch((error) =>
            {
                console.error("Failed to fetch data", error);
                setCategoryLoading(true);
                navigate(-1);
            });
    }, [])

    const filteredAndPaginatedData = useMemo(() =>
    {
        const firstPageIndex = (currentSalesPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentSalesPage, inputValue, sales]);

    const handleToggleDropdown = () =>
    {
        setIsOpen(!isOpen);
    };

    const handleItemClick = async (item, value) =>
    {
        setSelectedItem(item);
        setSelectedOptionValue(value);
        await dispatch(getProductSaleInfo({
            categoryId: category.id,
            period: value
        }));

        setIsOpen(false);
    };

    const selectCategory = async (id, name) =>
    {
        dispatch(setCategory({ id: id, name: name }))

        await dispatch(getProductSaleInfo({
            categoryId: id,
            period: selectedOptionValue
        }));

        setCurrentSalesPage(1)
    }

    if (!categoryLoading)
    {
        return <img style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            alignSelf: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }} src={LoadingIcon} alt="loading" />
    }
    if (loading) 
    {
        return <img style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            alignSelf: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }} src={LoadingIcon} alt="loading" />
    }
    return (
        <div className='sale-body'>

            {
                successfulAlertShow &&
                <div className='modal-backdrop'>
                    <SuccessfulNotification notifiaction={actionNotification} />
                </div>
            }
            {
                unsuccessfulAlertShow &&
                <div className='modal-backdrop'>
                    <UnsuccessfulNotification notifiaction={actionNotification} />
                </div>
            }

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

            <div className='sale-category-container'>
                <RecursedCombo
                    onCategoryClick={selectCategory}
                    mainCategories={mainCategories}
                    subCategories={subCategories}
                    category={category}
                />
            </div>

            <div className="sales-statistic-table-container">
                <div className='sales-statistic-table-header'>
                    <label style={{
                        'marginLeft': '25%'
                    }}>Назва</label>
                    <label>Код</label>
                    <label>Ціна</label>
                    <label>Колір</label>
                    <label>Залишок</label>
                    <label>Продано</label>
                </div>
            </div>

            <div className='sales-statistic-table-body'>
                {
                    filteredAndPaginatedData.map((sale, index) =>
                    (
                        <div className='sales-statistic-table-row' key={index}
                            style={{

                                borderRadius: ((((index + 1) % PageSize) === 0) || filteredAndPaginatedData.length === index + 1) ? '0px 0px 10px 10px' : '0px',
                                borderBottom: '1px solid #9DB1BC',
                            }}
                        >
                            <div
                                style={{
                                    marginLeft: '5%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4%'
                                }}
                            >
                                <img width={50} height={50} src={sale.picture} className='item-product-row-img' />
                                <label
                                    onClick={() =>
                                    {
                                        navigate('/admin/main/products/product/' + sale.id);
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        wordBreak: 'break-all',
                                        height: '36px',
                                        overflowY: 'hidden',
                                    }}
                                >{sale.name}</label>
                            </div>
                            <label>{sale.code}</label>
                            <label>{sale.price} ₴</label>
                            <label>{sale.color}</label>
                            <label
                                style={{
                                    color: sale.quantity > 0 ? '#01830E' : '#B31D21',
                                    fontWeight: '500'
                                }}
                            >
                                {
                                    sale.quantity > 0 ? `В наявності (${sale.quantity})` : 'Немає'
                                }
                            </label>
                            <label
                                style={{
                                    marginRight: '5%'
                                }}
                            >{sale.sold} одн.</label>
                        </div>
                    ))
                }
            </div>

            <div className='pag'>
                <CustomPagination
                    className="pagination-bar"
                    currentPage={currentSalesPage}
                    totalCount={filteredData.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentSalesPage(page)}
                />
            </div>
        </div>
    )
}

export default ItemSale