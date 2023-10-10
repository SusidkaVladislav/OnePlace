import React, { useRef, useState, useEffect, useMemo } from 'react';

import AdminSearch from '../../../../../services/search/adminSearch';
import RecursedCombo from '../../../controls/recursed-combo-box/RecursedCombo';
import CustomPagination from '../../../../../services/pagination/CustomPagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemProductStyles.css';

import { useDispatch, useSelector } from 'react-redux';

import { getCategoriesForSelect } from '../../../features/adminCategory/adminCategorySlice';


import
{
    setCategory,
    getAllBrands,
    getAllCountries,
    getAllColors,
    getCharacteristicsFromCategory,
    hideUnsuccessfulAlert,
    hideSuccessfulAlert,
    allProductCount,
    filterProducts,
    getAllProducts,
    getFilteredProducts,
} from '../../../features/adminProduct/adminProductSlice';

import ItemProductRow from './item-product-components/ItemProductRow';

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
        allProducts
    } = useSelector(state => state.adminProducts);

    var mainCategories = useRef([]);
    var subCategories = useRef([]);

    useEffect(() =>
    {
        dispatch(getCategoriesForSelect())
        mainCategories.current = categoriesForSelect.filter((category) => category.parentCategoryId === null)
        subCategories.current = categoriesForSelect.filter((category) => category.parentCategoryId !== null)
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
                                />

                                // <div className='div-row' key={index}>
                                //     <div className={`table-row ${index % 2 === 0 ? 'even-row' : ''}`}
                                //     //onClick={async event => { navigate(`user/${user.id}`); }}
                                //     >
                                //         <div className='c1'>{product.name}</div>
                                //         <div className='c2'>{product.code}</div>
                                //         <div className='c3'>{product.price}</div>
                                //         <div className='c4'>{product.color}</div>
                                //         <div className='c5'>{product.quantity}</div>
                                //     </div>
                                // </div>
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