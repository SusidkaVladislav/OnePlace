import React from 'react';
import "./MyMessages.css";

import { Grid, Typography } from "@mui/material";
import CommentIcon from '../../../../svg/user-cabinet/orders/CommentIcon';

//import MainImg from "../../../productPage/all-about-product/example-pics/black1.png"

const MyMessages = () =>
{
    return (
        <div className='mm-container1'>
            <Grid container>
            <Grid item xs={12} xl={12} className="mm-container2">
                    <div className="mm-container3">
                        <div className="mm-container4">
                            <div className="mm-container5">
                                <img src='' className='mr-product-image'></img>
                                <h5 className='bold-blue'>Ноутбук Fujitsu LifeBook E546, 14" IPS, Intel Core</h5>
                            </div>
                            <Typography className="t2-medium-blue">02 серпня 2023</Typography>
                        </div>
                       
                        <Typography className="t1-bold" sx={{paddingTop:"20px"}}>Тут запитаняяяяяя</Typography>
                       
                       <div className="mm-container6">
                       <CommentIcon/><h5 className='light-blue' style={{paddingLeft:"5px"}}>Стан повідомлення: в обробці</h5>
                       </div>
                    </div>
                </Grid>
                <Grid item xs={12} xl={12} className="mm-container2">
                    <div className="mm-container3">
                        <div className="mm-container4">
                            <div className="mm-container5">
                                <img src='' className='mr-product-image'></img>
                                <h5 className='bold-blue'>Ноутбук Fujitsu LifeBook E546, 14" IPS, Intel Core</h5>
                            </div>
                            <Typography className="t2-medium-blue">02 серпня 2023</Typography>
                        </div>
                       
                        <Typography className="t1-bold" sx={{paddingTop:"20px"}}>Тут запитаняяяяяя</Typography>
                       
                       <div className="mm-container6">
                       <CommentIcon/><h5 className='light-blue' style={{paddingLeft:"5px"}}>Стан повідомлення: відповідь надіслано</h5>
                       </div>
                    </div>
                </Grid>
            </Grid>
            
            <h5 className='bold-blue' style={{margin:"20px"}}>Тут з'являються запитання, які ви залишили менеджеру. Для того, щоб залишити запитання, перейдіть на сторінку товару, який вас цікавить, та оберіть вкладку "Задати питання". Наш менеджер надішле вам відповідь на електронну пошту або СМС повідомленням на протязі 3 робочих днів.</h5>
        </div>
    )
}

export default MyMessages;