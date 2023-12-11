import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

//#region Redux
import { useDispatch, useSelector } from 'react-redux';
import
{
    getOrderById,
    updateOrderStatus,
    updateOrderPaymentStatus,
    deleteOrder,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} from '../../../../features/adminOrders/adminOrdersSlice.js';
//#endregion

//#region Icons
import LoadingIcon from '../../../../../../svg/animations/LoadingAnimation.gif';
import WhiteSmallToBottomArrow from '../../../../../../svg/arrows/WhiteSmallToBottomArrow';
import NowaPoshtaLogo from '../../../../../../svg/shared-icons/novaposhtalogo.png';
import UkrPoshtaLogo from '../../../../../../svg/shared-icons/ukrposhtalogo.png';
//#endregion

//#region Services
import SuccessfulNotification from '../../../../controls/notifications/SuccessfulNotification';
import UnsuccessfulNotification from '../../../../controls/notifications/UnsuccessfulNotification';
//#endregion

export const ViewEditOrder = () =>
{
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [orderId, setOrerId] = useState(params.id)
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

    const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);
    const orderStatusoptions = ['Нове', 'Очікування', 'Відправлено', 'Виконано', 'Анульовано'];
    const orderStatusoptionsValues = [0, 1, 2, 3, 4];
    const [selectedOrderStatus, setSelectedOrderStatus] = useState();


    const [isPaymentStatusOpen, setIsPaymentStatusOpen] = useState(false);
    const paymentStatusoptions = ['Очікується', 'Оплачено', 'Скасовано'];
    const paymentStatusoptionsValues = [0, 1, 2];
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState();

    const {
        order,
        loading,
        successfulAlertShow,
        unsuccessfulAlertShow,
        actionNotification,
    } = useSelector(state => state.adminOrders)


    useEffect(() =>
    {
        dispatch(getOrderById(orderId))
    }, [])

    useEffect(() =>
    {
        switch (order.orderState)
        {
            case 'Registered':
                setSelectedOrderStatus(orderStatusoptions[0])
                break;
            case 'Processing':
                setSelectedOrderStatus(orderStatusoptions[1])
                break;
            case 'Shipped':
                setSelectedOrderStatus(orderStatusoptions[2])
                break;
            case 'Done':
                setSelectedOrderStatus(orderStatusoptions[3])
                break;
            case 'Rejected':
                setSelectedOrderStatus(orderStatusoptions[4])
                break;
            default:
                setSelectedOrderStatus(orderStatusoptions[4])
        }

        switch (order.paymentStatus)
        {
            case 'Pending':
                setSelectedPaymentStatus(paymentStatusoptions[0])
                break;
            case 'Approved':
                setSelectedPaymentStatus(paymentStatusoptions[1])
                break;
            case 'Rejected':
                setSelectedPaymentStatus(paymentStatusoptions[2])
                break;
            default:
                setSelectedPaymentStatus(paymentStatusoptions[2])
        }
       
    }, [order])


    const handleToggleOrderStatusDropdown = () =>
    {
        setIsOrderStatusOpen(!isOrderStatusOpen);
        setIsPaymentStatusOpen(false);
    };

    const handleTogglePaymentStatusDropdown = () =>
    {
        setIsPaymentStatusOpen(!isPaymentStatusOpen);
        setIsOrderStatusOpen(false);
    };

    const handleOrderStatusClick = async (item, orderState) =>
    {
        setSelectedOrderStatus(item);
        await dispatch(updateOrderStatus({ orderId, orderState }));
        await dispatch(getOrderById(orderId))
        setIsOrderStatusOpen(false);
    };

    const handlePaymentStatusClick = async (item, paymentStatus) =>
    {
        setSelectedPaymentStatus(item);
        await dispatch(updateOrderPaymentStatus({ orderId, paymentStatus }));
        await dispatch(getOrderById(orderId))
        setIsPaymentStatusOpen(false);
    };

    const handleConfirmDelete = async () =>
    {
        setIsConfirmDialogVisible(false);
        try
        {
            await dispatch(deleteOrder(orderId)).unwrap();
            await setTimeout(() =>
            {
                dispatch(hideSuccessfulAlert());
                navigate(-1);
            }, 1000)
        }
        catch (err)
        {
            setTimeout(() =>
            {
                dispatch(hideUnsuccessfulAlert());
            }, 2000);
        }
    };

    const handleCancelDelete = () =>
    {
        setIsConfirmDialogVisible(false);
    };

    const handleDeleteOrder = () =>
    {
        setIsConfirmDialogVisible(true);
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
            {successfulAlertShow && (
                <div className='modal-backdrop'>
                    <SuccessfulNotification notifiaction={actionNotification} />
                </div>
            )}
            {unsuccessfulAlertShow && (
                <div className='modal-backdrop'>
                    <UnsuccessfulNotification notifiaction={actionNotification} />
                </div>
            )}

            <div className='order-view-container'>
                <div className='order-view-container-left-info'>
                    <div className='order-view-product-delivery-container'>
                        <div className='order-view-product-container'>

                            <div className='order-date-info'>
                                <label>№{order.number}</label>
                                <label>{new Date(order.date).getDate()}.{new Date(order.date).getMonth() + 1}.{new Date(order.date).getFullYear()}</label>
                                <label>{
                                    order.orderState === 'Registered' ? 'Нове' : order.orderState === 'Processing' ? 'Очікування' :
                                        order.orderState === 'Shipped' ? 'Відправлено' : order.orderState === 'Done' ? 'Виконано' : 'Анульовано'
                                }</label>
                            </div>

                            <div className='order-product-info' id='scrollbar-style-1'>
                                {
                                    order?.products?.map((product, index) =>
                                    {
                                        return (
                                            <div className='order-product-info-product-row' key={index}>
                                                <img className='order-product-info-product-img' src={product.picture} alt='' />
                                                <div className='order-product-info-product-container'>
                                                    <label className='order-product-info-product-name'
                                                        onClick={() =>
                                                        {
                                                            navigate('/admin/main/products/product/' + product.id);
                                                        }}
                                                    >{product.name}</label>
                                                    <div>
                                                        <label className='order-product-info-product-quantity'>{product.quantity} шт.</label>
                                                        <label className='order-product-info-product-price'>{product.price} ₴</label>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className='total-price-container'>
                                <label>Всього: {order.totalPrice} ₴</label>
                            </div>

                        </div>

                        <div className='order-view-delivery-container'>
                            <div className='order-view-delivery-info'>
                                <label>Доставка</label>
                                <div >
                                    {
                                        order.deliveryInfo?.includes('UkrPoshta') ?
                                            (
                                                <div className='order-view-delivery-company'>
                                                    <img width={15} height={25} src={UkrPoshtaLogo} alt='logo' />
                                                    <label>Доставка "Укр Пошта"</label>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className='order-view-delivery-company'>
                                                    <img width={25} height={25} src={NowaPoshtaLogo} alt='logo' />
                                                    <label>Доставка "Нова Пошта"</label>
                                                </div>
                                            )
                                    }
                                </div>
                                <label className='order-view-delivery-info-label'>{order.deliveryInfo}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='order-view-container-right-info'>
                    <div className='order-view-user-edit-container'>
                        <div className='order-view-user-container'>
                            <label>Покупець</label>
                            <div className='order-view-user-info-container'>

                                <div className='order-view-user-info-row'>
                                    <label className='order-view-user-info-subscribtion-label'>
                                        Ім'я
                                    </label>
                                    <label className='order-view-user-info-value-label'>
                                        {order.userInitials}
                                    </label>
                                </div>

                                <div className='order-view-user-info-row'>
                                    <label className='order-view-user-info-subscribtion-label'>
                                        Номер телефону
                                    </label>
                                    <label className='order-view-user-info-value-label'>
                                        {order.phoneNumber}
                                    </label>
                                </div>

                                <div className='order-view-user-info-row'>
                                    <label className='order-view-user-info-subscribtion-label'>
                                        E-mail
                                    </label>
                                    <label className='order-view-user-info-value-label'>
                                        {
                                            order.email ? order.email : ''
                                        }
                                    </label>
                                </div>

                                <div className='order-view-user-info-row'>
                                    <label className='order-view-user-info-subscribtion-label'>
                                        Спосіб оплати
                                    </label>
                                    <label className='order-view-user-info-value-label'>
                                        {
                                            order.paymentMethod === 'CardPayment' ? 'Карткою' : 'Післяплата'
                                        }
                                    </label>
                                </div>

                                <div className='order-view-user-info-row'>
                                    <label className='order-view-user-info-subscribtion-label'>
                                        Коментар покупця
                                    </label>
                                    <label className='order-view-user-info-value-comment' id='scrollbar-style-1'>
                                        {
                                            order.comment
                                        }
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='order-view-edit-container'>
                            <label>Контроль замовлення</label>

                            <div className='order-view-edit-row'>
                                <label>Статус замовлення: </label>
                                <div
                                    onClick={handleToggleOrderStatusDropdown}>
                                    <div className={`order-dropdown-header ${isOrderStatusOpen ? 'open' : ''}`}>
                                        <label>{selectedOrderStatus}</label>
                                        <label><WhiteSmallToBottomArrow /></label>
                                    </div>
                                    {
                                        isOrderStatusOpen && (
                                            <div className="order-dropdown-list">
                                                {
                                                    orderStatusoptions.map((item, index) => (
                                                        <label
                                                            key={index}
                                                            className={`order-dropdown-item ${selectedOrderStatus === item ? 'selected' : ''}`}
                                                            onClick={() => handleOrderStatusClick(item, orderStatusoptionsValues[index])}>
                                                            {item}
                                                        </label>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <div className='order-view-edit-row'>
                                <label>Статус оплати: </label>
                                <div
                                    onClick={handleTogglePaymentStatusDropdown}>
                                    <div className={`order-dropdown-header ${isPaymentStatusOpen ? 'open' : ''}`}>
                                        <label>{selectedPaymentStatus}</label>
                                        <label><WhiteSmallToBottomArrow /></label>
                                    </div>
                                    {
                                        isPaymentStatusOpen && (
                                            <div className="order-dropdown-list">
                                                {
                                                    paymentStatusoptions.map((item, index) => (
                                                        <label
                                                            key={index}
                                                            className={`order-dropdown-item ${selectedPaymentStatus === item ? 'selected' : ''}`}
                                                            onClick={() => handlePaymentStatusClick(item, paymentStatusoptionsValues[index])}>
                                                            {item}
                                                        </label>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <button className='delete-order-btn'
                                onClick={() =>
                                {
                                    handleDeleteOrder()
                                }}>Видалити</button>
                        </div>
                    </div>
                </div>
                {isConfirmDialogVisible && (
                    <div className='modal-backdrop'>
                        <div className='confirm-dialog'>
                            <p>Ви впевнені, що бажаєте видалити запис?</p>
                            <label className='confirm-buttom' onClick={handleConfirmDelete}>Так</label>
                            <label className='confirm-buttom' onClick={handleCancelDelete}>Ні</label>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>

    )
}

export default ViewEditOrder; 