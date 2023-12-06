import React from 'react';
import "./MyOrders.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ParcelIcon from '../../../../svg/user-cabinet/orders/ParcelIcon';
import BagIcon from '../../../../svg/user-cabinet/orders/BagIcon';
import DollarIcon from '../../../../svg/user-cabinet/orders/DollarIcon';
import CommentIcon from '../../../../svg/user-cabinet/orders/CommentIcon';

import MainImg from "../../../productPage/all-about-product/example-pics/black1.png"

const MyOrders = () => {
    const tempData = [
        {orderId: 14566, comment:"just some comment", state: "in process", date: "02.02.2023", 
        paymentMethod: "cash", paymentState: "unpaid", finalPrice:"1500hrn", products: 
        [{name: "Навушники JBL TUNE 510 BT Black", color:"Black", amount:1, img: "", price: "1200hrn"},
        {name: "Навушники JBL TUNE 510 BT Black", color:"Pink", amount:2, img: "", price: "2400hrn"} ]},
        {orderId: 24566, comment:"another comment", state: "in process", date: "02.02.2023", 
        paymentMethod: "cash", paymentState: "unpaid", finalPrice:"1500hrn", products: 
        [{name: "Навушники JBL TUNE 510 BT Black", color:"Black", amount:1, img: "", price: "1200hrn"},
        {name: "Навушники JBL TUNE 510 BT Black", color:"Pink", amount:2, img: "", price: "2400hrn"},
        {name: "Навушники JBL TUNE 510 BT Black", color:"Pink", amount:2, img: "", price: "2400hrn"} ]}
    ]

    return(
            <Grid container className='mo-container1'>
                {tempData.map((order, index) => (
                    <Grid item xs={12} xl={12} className='mo-container2'>
                        <div className='mo-container3'>
                            <Typography className='t2-medium-blue'>Номер замовлення: {order.orderId}</Typography>
                            <Typography className='t2-medium-blue'>{order.date}</Typography>
                        </div>
                        <h5 className='bold-blue'><BagIcon/>Спосіб оплати: {order.paymentMethod}</h5>
                        <Grid container className='mo-container3'>
                            <Grid item xs={12} md={6} xl={6}>
                                <h5 className='bold-blue'><DollarIcon/>Стан оплати: {order.paymentState}</h5>
                            </Grid>
                            <Grid item xs={12} md={6} xl={6} className='mo-grid-item'>
                                <h5 className='bold-blue'>Стан замовлення: {order.state} <ParcelIcon/></h5>
                            </Grid>
                        </Grid>
                        <Grid container>
                            {order.products.map((product, prodIndex) =>(
                                <Grid item xs={12} xl={12} className='mo-container4'>
                                        <img src={MainImg} className='mo-product-image'></img>
                                        <div className='mo-container5'>
                                            <h4>{product.name}</h4>
                                            <h5 className='bold'>Колір: {product.color}</h5>
                                            <Grid container className='mo-container6'>
                                                <Grid item xs={12} md={6} xl={6}>
                                                    <h5 className='bold'>Кількість: {product.amount}</h5>
                                                </Grid>
                                                <Grid item xs={12} md={6} xl={6} className='mo-grid-item'>
                                                    <h5 className='bold'>Ціна: {product.price}</h5>
                                                </Grid>
                                            </Grid>
                                        </div>
                                </Grid>
                            ))}
                        </Grid>

                        <h5 className='bold-blue'><CommentIcon/> Коментар до замовлення:</h5>
                        <div className="mo-comment-container">
                            <h5 className='bold-blue'>{order.comment}</h5>
                        </div>
                        <div className='mo-container7'>
                            <h5 className='bold-blue'>Вартість замовлення: {order.finalPrice}</h5>
                        </div>
                    </Grid>
                ))}
            </Grid>
    )
}

export default MyOrders;