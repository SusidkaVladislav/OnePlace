import React, { useState } from 'react';
import './productInfo.css';

import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import BlueRightLongArrow from '../../../svg/arrows/BlueRightLongArrow';
import Divider from "../../../svg/shared-icons/Divider";
import AllAboutBroduct from '../all-about-product/AllAboutProduct';
import ProductCharacteristics from "../product-characteristics/ProductCharacteristics";
import Reviews from "../reviews/Reviews";
import CouldInterest from '../could-interest/CouldInterest';

const ProductInfo = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('allAboutProduct'); 

    const handleMenuItemClick = (menuItem) => {
      setActiveMenuItem(menuItem);
    };
  

    return(
        <div className='pi-container1'>
             <Grid container className="pi-categories-container">
                    <Grid item>
                        <Typography className="t2-medium-blue">Головна</Typography>
                    </Grid>
                    <Grid item  className="pi-arrow-container">
                        <BlueRightLongArrow/>
                    </Grid>
                    <Grid item>
                        <Typography className="t2-medium-blue">Техніка та електроніка</Typography>
                    </Grid>
                    <Grid item  className="pi-arrow-container">
                        <BlueRightLongArrow/>
                    </Grid>
                    <Grid item>
                        <Typography className="t2-medium-blue">Навушники та гарнітура</Typography>
                    </Grid>
                    <Grid item  className="pi-arrow-container">
                        <BlueRightLongArrow/>   
                    </Grid>
                    <Grid item>
                        <Typography className="t2-medium-brown2">Навушники JBL TUNE 510 BT Black (JBLT510BTBLKEU) </Typography>
                    </Grid>
                </Grid>
                <Grid container className="pi-menu-container">
                    <Grid item className="pi-menu-item"  onClick={() => handleMenuItemClick('allAboutProduct')}>
                        <Typography className={activeMenuItem === 'allAboutProduct' ? 't1-bold-orange1' : 't1-light'}>Усе про товар</Typography>
                    </Grid>
                    <Grid item  className="pi-divider-container">
                        <Divider/>
                    </Grid>
                    <Grid item className="pi-menu-item" onClick={() => handleMenuItemClick('characteristics')}>
                        <Typography  className={activeMenuItem === 'characteristics' ? 't1-bold-orange1' : 't1-light'}>Характеристики</Typography>
                    </Grid>
                    <Grid item  className="pi-divider-container">
                    <Divider/>
                    </Grid>
                    <Grid item className="pi-menu-item" onClick={() => handleMenuItemClick('reviews')}>
                        <Typography className={activeMenuItem === 'reviews' ? 't1-bold-orange1' : 't1-light'}>Відгуки</Typography>
                    </Grid>
                </Grid>
                <div className='pi-info-container'>
                    <div className={activeMenuItem === 'allAboutProduct' ? 'visible' : 'hidden'}>
                    <AllAboutBroduct/>
                    </div>
                    <div className={activeMenuItem === 'characteristics' ? 'visible' : 'hidden'}>
                    <ProductCharacteristics/>
                    </div>
                    <div className={activeMenuItem === 'reviews' ? 'visible' : 'hidden'}>
                    <Reviews/>
                    </div>
                </div>
                <CouldInterest/>
        </div>
    )
}

export default ProductInfo;