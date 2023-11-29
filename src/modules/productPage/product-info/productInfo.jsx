import React, { useState } from 'react';
import './productInfo.css';

import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import BlueRightLongArrow from '../../../svg/arrows/BlueRightLongArrow';
import Divider from "../../../svg/shared-icons/Divider";
import AllAboutBroduct from '../all-about-product/AllAboutProduct';

const ProductInfo = () => {
    const [selectedInfoPage, setSelectedInfoPage] = useState(null);

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
                    <Grid item>
                        <Typography className="t1-bold-orange1">Усе про товар</Typography>
                    </Grid>
                    <Grid item  className="pi-divider-container">
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <Typography className="t1-light">Характеристики</Typography>
                    </Grid>
                    <Grid item  className="pi-divider-container">
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <Typography className="t1-light">Відгуки</Typography>
                    </Grid>
                </Grid>
                <div className='pi-info-container'>
                    <AllAboutBroduct/>
                </div>
        </div>
    )
}

export default ProductInfo;