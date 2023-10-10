import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOrdersByUserId } from '../adminOrders/adminOrdersSlice';
import './userOrderBlock.css';

const UserOrdersBlock = (prop) =>
{
    const userId = prop.userId;
    const dispatch = useDispatch();

    const { orders } = useSelector(state => state.adminOrders)

    useEffect(() =>
    {
        dispatch(fetchAllOrdersByUserId(userId));
    }, [])

    return (
        <div className='order-div'>
            <div className='order-label'>
                <label>Замовлення </label>
            </div>

            <div className='order-div-header'>
                <label className='order-div-name'>Номер</label>
                <label className='order-div-code'>Оплата</label>
                <label className='order-div-status'>Статус</label>
                <label className='order-div-price'>Ціна</label>
            </div>

            <div className='order-div-list' id='scrollbar-style-1'>
                {orders.map((order) => (
                    <div className='order-div-row' key={order.id}
                        onClick={event => { }}
                    >
                        <div className='order-div-name'>
                            <label>{order.orderNumber}</label>
                        </div>
                        <div className='order-div-code'>
                            <label>{order.paymentStatus}</label>
                        </div>
                        <div className='order-div-status'>
                            <label>{order.orderStatus}</label>
                        </div>
                        <div className='order-div-price'>
                            <label>{order.totalPrice}</label>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserOrdersBlock;