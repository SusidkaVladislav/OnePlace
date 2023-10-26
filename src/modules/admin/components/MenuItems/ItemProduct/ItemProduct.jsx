import React, { useRef, useState, useEffect, useMemo } from 'react';

//#region Services
import AdminSearch from '../../../../../services/search/adminSearch';
import RecursedCombo from '../../../controls/recursed-combo-box/RecursedCombo';
import CustomPagination from '../../../../../services/pagination/CustomPagination';
import ItemProductRow from './item-product-components/ItemProductRow';
import Alert from '@mui/material/Alert';
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
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} from '../../../features/adminProduct/adminProductSlice';
//#endregion

import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingIcon from '../../../../../svg/animations/LoadingAnimation.gif';
import './ItemProductStyles.css';

const PageSize = 8;

const ItemProduct = () =>
{
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState('');
    const [currentProductPage, setCurrentProductPage] = useState(1);

    const { categoriesForSelect } = useSelector(state => state.adminCategories);

    const filteredData = useSelector(state => getFilteredProducts(state, inputValue));

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
        dispatch(resetProduct())
        dispatch(getCategoriesForSelect())
        mainCategories.current = categoriesForSelect.filter((category) => category.parentCategoryId === null)
        subCategories.current = categoriesForSelect.filter((category) => category.parentCategoryId !== null)

        dispatch(setCategory({ id: category.id, name: category.name }))

        dispatch(getAllProducts(category.id));

    }, [])


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
    }, [currentProductPage, inputValue, allProducts]);


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
        <div className='item-product-main-container'>
            <div className='item-product-row-1'>
                <span style={{
                    width: '400px',
                }}>
                    <AdminSearch
                        onSearchChange={value =>
                        {
                            setInputValue(value);
                            setCurrentProductPage(1);
                        }}
                    />
                </span>
                <select className='item-product-sale-select-filter'>
                    <option>Всі</option>
                    <option>Без знижки</option>
                    <option>Зі знижкою</option>
                </select>
            </div>

            <div className='item-product-row-2'>
                {
                    successfulAlertShow &&
                    <Alert variant='filled'
                        severity="success"
                        sx={
                            {
                                width: 'fit-content',
                                height: 'fit-content',
                                minWidth: '433px',
                                marginTop: '7%',
                                marginLeft: '60%',
                                position: 'absolute'
                            }
                        }
                        onClose={() => { dispatch(hideSuccessfulAlert()) }}>{actionNotification}</Alert>
                }
                {
                    unsuccessfulAlertShow &&
                    <Alert value='filled'
                        severity="error"
                        sx={
                            {
                                width: 'fit-content',
                                minWidth: '433px',
                                height: 'fit-content',
                                marginTop: '7%',
                                marginLeft: '60%',
                                position: 'absolute'
                            }
                        }
                        onClose={() => { dispatch(hideUnsuccessfulAlert()) }}>{actionNotification}</Alert>
                }
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
    );
}

export default ItemProduct;