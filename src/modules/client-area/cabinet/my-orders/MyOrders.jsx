import React, { useEffect } from 'react';
import "./MyOrders.css";

import
{
    Grid,
    Typography,
    useMediaQuery,
} from "@mui/material"

//#region Icons
import ParcelIcon from '../../../../svg/user-cabinet/orders/ParcelIcon';
import BagIcon from '../../../../svg/user-cabinet/orders/BagIcon';
import DollarIcon from '../../../../svg/user-cabinet/orders/DollarIcon';
import CommentIcon from '../../../../svg/user-cabinet/orders/CommentIcon';
import NoOrdersIcon from '../../../../svg/user-cabinet/orders/NoOrdersTextIcon'
import NoOrdersTextXS from '../../../../svg/user-cabinet/orders/NoOrdersTextXS';
//#endregion

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import
{
    getAllMyOrders
} from '../../features/orders/myOrdersSlics';

import LoadingAnimation from '../../../../common-elements/loading/LoadingAnimation';

const NO_SERVER_CONNECTION_PATH = "/no_server_connection";
const MyOrders = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const md = useMediaQuery('(min-width: 900px)');

    useEffect(() =>
    {
        dispatch(getAllMyOrders());
    }, [])

    const {
        userOrders,
        loadingUserOrders,
        myOrdersServerConnectionError,
    } = useSelector(state => state.myOrders);

    if (myOrdersServerConnectionError)
    {
        navigate(NO_SERVER_CONNECTION_PATH)
    }
    if (loadingUserOrders)
    {
        return (
            <Grid
                sx={{
                    minHeight: '100vh'
                }}
            >
                <LoadingAnimation />
            </Grid>
        )
    }
    return (
        <div className='mo-div'>
            {
                userOrders?.length > 0 ? <Grid container className='mo-container1'>
                    {userOrders?.map((order, index) => (
                        <Grid
                            key={index}
                            item
                            xs={12}
                            xl={12}
                            className='mo-container2'
                        >
                            <div className='mo-container3'>
                                <Typography className='t2-medium-blue'>Номер замовлення: {order?.number}</Typography>
                                <Typography className='t2-medium-blue'>{new Date(order?.date).getUTCDate() + '.' + (new Date(order?.date).getMonth() + 1) + '.' + new Date(order?.date).getFullYear()}</Typography>
                            </div>
                            <h5 className='bold-blue'><BagIcon />Спосіб оплати: {order?.paymentMethod === 'CardPayment' ? 'Карткою' : 'Післяплата'}</h5>
                            <Grid container className='mo-container3'>
                                <Grid item xs={12} md={6} xl={6}>
                                    <h5 className='bold-blue'><DollarIcon />Стан оплати: {order?.paymentStatus === 'Pending' ? 'Очікується оплата'
                                        : order?.paymentStatus === 'Approved' ? 'Оплачено' : 'Скасовано'}</h5>
                                </Grid>
                                <Grid item xs={12} md={6} xl={6} className='mo-grid-item'>
                                    <h5 className='bold-blue'>Стан замовлення: {order?.orderState === 'Registered' ? 'Нове' : order?.orderState === 'Processing' ? 'Очікування' :
                                        order?.orderState === 'Shipped' ? 'Відправлено' : order?.orderState === 'Done' ? 'Виконано' : 'Анульовано'} <ParcelIcon /></h5>
                                </Grid>
                            </Grid>
                            <Grid container>
                                {order?.products?.map((product, prodIndex) => (
                                    <Grid
                                        key={prodIndex}
                                        item
                                        xs={12}
                                        xl={12}
                                        className='mo-container4'
                                    >
                                        <img src={product?.picture} className='mo-product-image'></img>
                                        <div className='mo-container5'>
                                            <h4
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() =>
                                                {
                                                    navigate(`/product-page/${product?.id}`)
                                                }}
                                            >{product?.name}</h4>
                                            <h5 className='bold'>Колір: {product?.colorName}</h5>
                                            <Grid container item xs={12} className='mo-container6'>
                                                <Grid item xs={12} md={6} xl={6}>
                                                    <h5 className='bold'>Кількість: {product?.quantity}</h5>
                                                </Grid>
                                                <Grid item xs={12} md={6} xl={6} className='mo-grid-item'>
                                                    <h5 className='bold'>Ціна: {product?.price}</h5>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>

                            <h5 className='bold-blue'><CommentIcon /> Коментар до замовлення:</h5>
                            <div className="mo-comment-container">
                                <h5 className='bold-blue'>{order?.comment}</h5>
                            </div>
                            <div className='mo-container7'>
                                <h5 className='bold-blue'>Вартість замовлення: {order?.totalPrice}</h5>
                            </div>
                        </Grid>
                    ))}
                </Grid> :
                    <Grid
                        item
                        container
                        xs={12}
                        sx={{
                            height: '100%',
                        }}
                    >
                        <Grid
                            sx={{
                                margin: '10%',
                                marginLeft: '15%',
                            }}
                        >
                            {
                                md ? <NoOrdersIcon /> : <NoOrdersTextXS />
                            }

                        </Grid>
                    </Grid>
            }

        </div>
    )
}

export default MyOrders;