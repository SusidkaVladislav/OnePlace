import React, { useState } from 'react';
import './MyReviews.css';

import {Grid, Typography} from "@mui/material";
import Divider from "../../../../svg/shared-icons/Divider";
import StarRating from '../../../productPage/controls/StarRating';
import TrashIcon from '../../../../svg/user-cabinet/favourites/TrashIcon';
import ReviewReplyIcon from '../../../../svg/client-icons/productPage/ReviewReplyIcon';
import PlusIcon from '../../../../svg/user-cabinet/reviews/PlusIcon';

import MainImg from "../../../productPage/all-about-product/example-pics/black1.png"

const MyReviews = () =>
{
    const [activeMenuItem, setActiveMenuItem] = useState('yourReviews'); 

    const handleMenuItemClick = (menuItem) => {
      setActiveMenuItem(menuItem);
    };

    return (
        <div className='mr-container1'>
            <Grid container>
                    <Grid item onClick={() => handleMenuItemClick('yourReviews')} sx={{cursor:"pointer"}}>
                        <Typography className={activeMenuItem === 'yourReviews' ? 't1-bold-orange1' : 't1-light'}>Ваші відгуки</Typography>
                    </Grid>
                    <Grid item  className="mr-divider-container">
                        <Divider/>
                    </Grid>
                    <Grid item onClick={() => handleMenuItemClick('productsForReview')} sx={{cursor:"pointer"}}>
                        <Typography  className={activeMenuItem === 'productsForReview' ? 't1-bold-orange1' : 't1-light'}>Товари до яких ви можете залишити відгук</Typography>
                    </Grid>
            </Grid>
            
            <div className={activeMenuItem === 'yourReviews' ? 'visible' : 'hidden'}>
            <Grid container sx={{justifyContent:"flex-end"}}>
                <Grid item xs={12} xl={12} className="mr-container2">
                    <div className="mr-container3">
                        <div className="mr-container4">
                            <div className="mr-container5">
                                <img src={MainImg} className='mr-product-image'></img>
                                <h5 className='bold-brown2'>Ноутбук Fujitsu LifeBook E546, 14" IPS, Intel Core</h5>
                            </div>
                            <Typography className="t2-medium-brown3">02 серпня 2023</Typography>
                        </div>
                        <StarRating defaultRating={3}/>
                        <Typography className="t1-bold" sx={{paddingTop:"20px"}}>Гарний телефон, купували на подарунок, сподобався.</Typography>
                        <div className="mr-container6"><TrashIcon/></div>
                    </div>
                </Grid>

                <Grid item xs={11} xl={11} className="mr-container2">
                <div className="mr-container3">
                    <div className="mr-container4">
                        <div style={{display:"flex"}}>
                            <ReviewReplyIcon/>
                            <Typography className="t1-bold-orange1">Відповідь адміністратора</Typography>
                        </div>
                        <Typography className="t2-medium-brown3">02 серпня 2023</Typography>
                    </div>
                    <Typography className="t1-bold review-description">Дякуємо за відгук!</Typography>
                </div>
            </Grid>
            </Grid>
            </div>
            <div className={activeMenuItem === 'productsForReview' ? 'visible' : 'hidden'}>
                <Grid container gap={1}>
                    <Grid item xs = {12} sm={12} md={5} lg={5} className='mr-container2'>
                        <div className="mr-container7">
                            <img src={MainImg} className='mr-product-image'></img>
                            <div>
                                <h5 className='bold-brown2'>Ноутбук Fujitsu LifeBook E546, 14" IPS, Intel Core</h5>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                <Typography className="t2-medium-brown3">Дата покупки: 02 серпня 2023</Typography>
                                <PlusIcon></PlusIcon>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs = {12} sm={12} md={5} lg={5} className='mr-container2'>
                        <div className="mr-container7">
                            <img src={MainImg} className='mr-product-image'></img>
                            <div>
                                <h5 className='bold-brown2'>Ноутбук Fujitsu LifeBook E546, 14" IPS, Intel Core</h5>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                <Typography className="t2-medium-brown3">Дата покупки: 02 серпня 2023</Typography>
                                <PlusIcon></PlusIcon>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs = {12} sm={12} md={5} lg={5} className='mr-container2'>
                        <div className="mr-container7">
                            <img src={MainImg} className='mr-product-image'></img>
                            <div>
                                <h5 className='bold-brown2'>Ноутбук Fujitsu LifeBook E546, 14" IPS, Intel Core</h5>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                <Typography className="t2-medium-brown3">Дата покупки: 02 серпня 2023</Typography>
                                <PlusIcon></PlusIcon>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MyReviews;