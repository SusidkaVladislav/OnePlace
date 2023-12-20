import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrdersByUserId } from '../adminOrders/adminOrdersSlice';
import LoadingIcon from '../../../../svg/animations/LoadingAnimation.gif';
import './userOrderBlock.css';
import LoadingAnimation from '../../../../common-elements/loading/LoadingAnimation';

const UserOrdersBlock = (props) =>
{
    const navigate = useNavigate();

    const {
        userId
    } = props;

    const dispatch = useDispatch();

    const {
        getAllOrdersByUserIdLoading,
        orders,
    } = useSelector(state => state.adminOrders)

    useEffect(() =>
    {
        if (userId !== undefined && userId !== null)
            dispatch(getAllOrdersByUserId(userId));
    }, [])


    if (getAllOrdersByUserIdLoading)
    {
        return <LoadingAnimation />
    }

    return (
        <div className='order-div'>
            <div className='order-label'>
                <label>Замовлення</label>
            </div>
            <div className='order-block'>
                <div className='order-div-header'>
                    <label>Номер</label>
                    <label>Оплата</label>
                    <label>Статус</label>
                    <label>Ціна</label>
                </div>

                <div className='order-div-list' id='scrollbar-style-1'>
                    {orders.map((order) => (
                        <div className='order-div-row' key={order.id}
                            onClick={() => { navigate(`/admin/main/orders/order/${order.id}`) }}>
                            <label>{order.orderNumber}</label>
                            <label
                                style={{
                                    overflow: 'hidden',
                                    wordBreak: 'break-word',
                                }}
                            >{order.paymentStatus === 'Pending' ? 'Очікується оплата'
                                : order.paymentStatus === 'Approved' ? 'Оплачено' : 'Скасовано'}</label>
                            <label
                                style={{
                                    overflow: 'hidden',
                                    wordBreak: 'break-word',
                                }}
                            >{order.orderStatus === 'Registered' ? 'Нове' : order.orderStatus === 'Processing' ? 'Очікування' :
                                order.orderStatus === 'Shipped' ? 'Відправлено' : order.orderStatus === 'Done' ? 'Виконано' : 'Анульовано'}</label>
                            <label>{order.totalPrice}₴</label>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default UserOrdersBlock;