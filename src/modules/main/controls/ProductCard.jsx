import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import HeartIcon from '../../../svg/client-icons/header/HeartIcon';
import FilledHeartIcon  from '../../../svg/client-icons/header/FilledHeartIcon';
import CartIcon from '../../../svg/client-icons/header/CartIcon';
import Img from './81d590461560bfa45e34827c68dd276c.png';

const ProductCard = () => {
    const [filled, setFilled] = React.useState(false);
    const [inCart, setInCart] = React.useState(false);
   
    function HeartClick () {
        setFilled(!filled);
    }

    function AddToCart(){
        setInCart(!inCart);
    }

    return (
        <Card sx={{ 
            width: "264px", 
            height: "366px", 
            borderRadius: '10px',
            background: '#F6F6F6',
            boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)',
            padding: "18px"}}>

            <div style={{position: 'relative'}}>
                <CardMedia
                    id = "imgContainer"
                    component="img"
                    height="196px"
                    width="228px"
                    image={Img}
                    alt="Product image"
                    sx={{
                        objectFit: 'contain', 
                        background: 'white', 
                        borderRadius: '4px',
                        transition: "transform .6s",
                        "&:hover":{
                            transform: "scale(1.2)"
                        }}}/>
                <div style={{borderRadius: "60px", background: "#DCCBE5", position: "absolute", bottom: "12px", left: "12px", width: "52px", height: "30px", justifyContent: "center", alignItems: "center", display: "flex"}}>
                    <span id = "salePercent" className='t2-bold'>-12%</span>
                </div>
                <div id="heartBtn" onClick={HeartClick} style={{position: "absolute", top: "12px", right: "12px"}}>
                    {filled === false ? 
                    (<div id="heartIcon"><HeartIcon/></div>) :
                    (<div id="filledHeartIcon"><FilledHeartIcon/></div>)} 
                </div>
            </div>

            <div style={{position: 'relative'}}>
                <CardContent sx={{padding: '0', paddingTop: '12px'}}>
                    <Typography id = "description" className='t1-bold'>
                    Смартфон Xiaomi Redmi 9A 4/64GB (Grey) [56710]
                    </Typography>
                    {/* Можна виикориствоувати t2-medium-orange і t2-medium-green */}
                    <Typography id = "availability" className='t2-medium-orange' sx={{paddingTop: '12px'}}> 
                    Під замовлення
                    </Typography>
                    <Typography id = "price" className='t1-bold-red' sx={{paddingTop: '12px'}}> 
                    3 859 грн
                    </Typography>
                    <Typography id = "oldPrice" className='t2-medium' sx={{textDecoration:'line-through'}}> 
                    4 399 грн
                    </Typography>

                    <div style={{position: "absolute", bottom: "35px", right: "12px"}} onClick={AddToCart}>
                        <Badge color="primary" badgeContent=" " variant="dot" overlap="circular" invisible={!inCart} >
                        <CartIcon onClick={() => {/* Navigate to a different page */}}></CartIcon>
                        </Badge>
                    </div>
                </CardContent>
            </div>
      </Card>
    )
}

export default ProductCard;