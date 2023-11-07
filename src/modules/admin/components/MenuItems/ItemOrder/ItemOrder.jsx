import React, { useEffect, useState, Fragment, useMemo } from 'react';
import './ItemOrderStyles.css';
import AdminSearch from '../../../../../services/search/adminSearch';
import LoadingIcon from '../../../../../svg/animations/LoadingAnimation.gif';
import CustomPagination from '../../../../../services/pagination/CustomPagination';

import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import
{
    getOrders,
    getFilteredOrders,
} from '../../../features/adminOrders/adminOrdersSlice';

const PageSize = 10;
const ItemOrder = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = useSelector(state => getFilteredOrders(state, inputValue));

    const {
        loading,
        orders,
    } = useSelector(state => state.adminOrders);

    useEffect(() =>
    {
        dispatch(getOrders())
    }, [])


    const filteredAndPaginatedData = useMemo(() =>
    {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredData.slice(firstPageIndex, lastPageIndex).toReversed();
    }, [currentPage, inputValue, orders]);


    const handlerGoTOOrder = (id) =>
    {
        navigate('order/' + id)
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
            <AdminSearch
                onSearchChange={value =>
                {
                    setInputValue(value);
                    setCurrentPage(1);
                }}
            />

            <div className='order-count'>
                <label><span
                    style={{
                        'font': 'Montserrat Alternates',
                        'fontWeight': '500',
                        'fontSize': '20px',
                    }}
                >({filteredData.length})</span> замовлень</label>
            </div>

            <div className='orders-table'>
                <div className='orders-table-header'>
                    <label>Ім'я</label>
                    <label>Замовлення</label>
                    <label>Сума</label>
                    <label>Оплата</label>
                    <label>Статус</label>
                </div>

                <div className='orders-table-body'>
                    {
                        filteredAndPaginatedData.toReversed().map((order, index) =>
                        {
                            return (
                                <div className='orders-table-body-row' key={index}
                                    onClick={() =>
                                    {
                                        handlerGoTOOrder(order.id)
                                    }}
                                >
                                    <label>{order.initials}</label>
                                    <label>{order.orderNumber}</label>
                                    <label>{order.totalPrice} грн.</label>
                                    <label>
                                        {
                                            order.paymentStatus === 'Pending' ? 'Очікується оплата'
                                                : order.paymentStatus === 'Approved' ? 'Оплачено' : 'Скасовано'
                                        }
                                    </label>
                                    <label
                                        style={{
                                            'backgroundColor': order.orderStatus === 'Registered' ? '#DA8D33' :
                                                order.orderStatus === 'Processing' ? '#6B81F0' : order.orderStatus === 'Shipped' ? '#C4A8D3' :
                                                    order.orderStatus === 'Done' ? '#01830E' : '#B31D21',
                                            'color': '#F6F6F6',
                                            'borderRadius': '10px',
                                            'paddingLeft': '10px',
                                        }}
                                    >
                                        {
                                            order.orderStatus === 'Registered' ? 'Нове' : order.orderStatus === 'Processing' ? 'Очікування' :
                                                order.orderStatus === 'Shipped' ? 'Відправлено' : order.orderStatus === 'Done' ? 'Виконано' : 'Анульовано'
                                        }
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


            <div className='pag'>
                <CustomPagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={filteredData.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)} />
            </div>
        </Fragment>
    );
}

export default ItemOrder;