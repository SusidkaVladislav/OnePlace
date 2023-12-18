import React from 'react';
import "./MyDesires.css";

import Grid from "@mui/material/Grid";
import TrashIcon from '../../../../svg/user-cabinet/favourites/TrashIcon';
import CartIcon from '../../../../svg/client-icons/header/CartIcon';
import Typography from '@mui/material/Typography';

import MainImg from "../../../productPage/all-about-product/example-pics/black1.png"

const MyDesires = () =>
{
    const tempData = [ 
        {name:"Навушники JBL TUNE 510 BT Black (JBLT510BTBLKEU)", stock: "В наявності", oldPrice:"3 299 грн", newPrice: "2 449 грн"},
        {name:"Навушники JBL TUNE 510 BT Black (JBLT510BTBLKEU)", stock: "В наявності", oldPrice:"3 299 грн", newPrice: "2 449 грн"},
        {name:"Навушники JBL TUNE 510 BT Black (JBLT510BTBLKEU)", stock: "В наявності", oldPrice:"3 299 грн", newPrice: "2 449 грн"},
        {name:"Навушники JBL TUNE 510 BT Black (JBLT510BTBLKEU)", stock: "В наявності", oldPrice:"3 299 грн", newPrice: "2 449 грн"},
    ]

    return (
        <div className='md-div'>
            <Grid container className='md-container1'>
            {tempData.map((product, index)=>(
                <Grid item xs={12} xl={12} className='md-container2'>
                    <img src={MainImg} className='md-product-image'></img>
                    <Grid container>
                        <Grid item xs={12} s={10} md={10} xl={10} className='md-container3'>
                            <div>
                                <h5 className="light">{product.name}</h5>
                                <Typography className="t1-bold-orange1">{product.stock}</Typography>
                            </div>
                            <div>
                                <Typography className='t2-medium' sx={{ textDecoration: 'line-through'}}>{product.oldPrice}</Typography>
                                <h5 className='bold-red'>{product.newPrice}</h5>
                            </div>
                        </Grid>
                        <Grid item xs={12} s={2} md={2} xl={2}>
                            <Grid container>
                            <Grid item xs={7} s={12} md={12} xl={12}><TrashIcon/></Grid>
                            <Grid item xs={0} s={12} md={12} xl={12} sx={{height:"70px"}}></Grid>
                            <Grid item xs={5} s={12} md={12} xl={12}><CartIcon/></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
        </div>
    )
}

export default MyDesires;