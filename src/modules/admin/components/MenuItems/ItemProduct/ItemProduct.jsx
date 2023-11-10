import React, { useRef, useState, useEffect, useMemo, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
//#region Services
import AdminSearch from '../../../../../services/search/adminSearch';
import RecursedCombo from '../../../controls/recursed-combo-box/RecursedCombo';
import CustomPagination from '../../../../../services/pagination/CustomPagination';
import ItemProductRow from './item-product-components/ItemProductRow';
import SuccessfulNotification from '../../../controls/notifications/SuccessfulNotification';
import UnsuccessfulNotification from '../../../controls/notifications/UnsuccessfulNotification';
//#endregion

//#region Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesForSelect } from '../../../features/adminCategory/adminCategorySlice';
import
{
    setCategory,
    getAllProducts,
    getFilteredProducts,
    resetProduct,
} from '../../../features/adminProduct/adminProductSlice';
//#endregion

import WhiteSmallToBottomArrow from '../../../../../svg/arrows/WhiteSmallToBottomArrow';

import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingIcon from '../../../../../svg/animations/LoadingAnimation.gif';
import './ItemProductStyles.css';

const PageSize = 8;

const ItemProduct = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [currentProductPage, setCurrentProductPage] = useState(1);

    const [isOpen, setIsOpen] = useState(false);
    const options = ['Всі', 'Без знижки', 'Зі знижкою'];
    const optionsValues = [1, 2, 3];
    const [selectedItem, setSelectedItem] = useState(options[0]);
    const [selectedOptionValue, setSelectedOptionValue] = useState(optionsValues[0])

    const [categoryLoading, setCategoryLoading] = useState(false)

    const filteredData = useSelector(state => getFilteredProducts(state,
        { inputValue: inputValue, discount: selectedOptionValue })
    );


    const {
        category,
        allProducts,
        loading,
        successfulAlertShow,
        unsuccessfulAlertShow,
        actionNotification,
    } = useSelector(state => state.adminProducts);

    var mainCategories = useRef([]);
    var subCategories = useRef([]);

    useEffect(() =>
    {
        dispatch(resetProduct());
        dispatch(getCategoriesForSelect())
            .then((response) =>
            {
                const categoriesForSelect = response.payload;
                mainCategories.current = categoriesForSelect.filter(
                    (category) => category.parentCategoryId === null
                );
                subCategories.current = categoriesForSelect.filter(
                    (category) => category.parentCategoryId !== null
                );
                setCategoryLoading(true);
            })
            .catch((error) =>
            {
                console.error("Failed to fetch data", error);
                setCategoryLoading(true);
                navigate(-1);
            });

        if (category.id !== null)
        {
            dispatch(
                setCategory({
                    id: category.id,
                    name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
                })
            );
            dispatch(getAllProducts(category.id));
        }
    }, []);

    const selectCategory = async (id, name) =>
    {
        dispatch(setCategory({ id: id, name: name }))
        await dispatch(getAllProducts(id));
        setCurrentProductPage(1)
    }

    const filteredAndPaginatedData = useMemo(() =>
    {
        const firstPageIndex = (currentProductPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentProductPage, inputValue, selectedOptionValue, allProducts]);


    const handleToggleDropdown = () =>
    {
        setIsOpen(!isOpen);
    };

    const handleItemClick = async (item, value) =>
    {
        setSelectedItem(item);
        setSelectedOptionValue(value);
        setIsOpen(false);
    };

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
        <Fragment>
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
            <div className='item-product-main-container'>
                <div className='main-body-header' >
                    <AdminSearch
                        onSearchChange={value =>
                        {
                            setInputValue(value);
                            setCurrentProductPage(1);
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
                                <div className="dropdown-list-product-sale-filter">
                                    {
                                        options.map((item, index) => (
                                            <label
                                                key={index}
                                                className={`dropdown-item-product-sale-filter ${selectedItem === item ? 'selected' : ''}`}
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

                <div className='item-product-row-2'>
                    <RecursedCombo
                        onCategoryClick={selectCategory}
                        mainCategories={mainCategories}
                        subCategories={subCategories}
                        category={category}
                    />
                </div>

                <div className='item-product-row-3'>
                    <div className='item-products-table' >

                        <div className='item-products-table-head'>
                            <label>Назва</label>
                            <label>Код</label>
                            <label>Ціна</label>
                            <label>Колір</label>
                            <label>К-сть</label>
                            <label>Статус</label>
                        </div>
                        <div className=''>
                            {filteredAndPaginatedData.map((product, index) => (
                                <ItemProductRow
                                    key={index}
                                    picture={product.picture}
                                    name={product.name}
                                    code={product.code}
                                    price={product.price}
                                    color={product.color}
                                    quantity={product.quantity}
                                    productId={product.id}
                                />
                            )
                            )}
                        </div>
                    </div>
                    <div className='pag'>
                        <CustomPagination
                            className="pagination-bar"
                            currentPage={currentProductPage}
                            totalCount={filteredData.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentProductPage(page)}
                        />
                    </div>
                </div>
            </div>
        </Fragment>

    );
}

export default ItemProduct;