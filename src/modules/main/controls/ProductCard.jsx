import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import HeartIcon from '../../../svg/client-icons/header/HeartIcon';
import FilledHeartIcon from '../../../svg/client-icons/header/FilledHeartIcon';
import CartIcon from '../../../svg/client-icons/header/CartIcon';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import
{
    addToCart,
    getUserCart,
    deleteFromCart,
    setCartCount,
} from '../features/basket/cartSlice';


const LOCAL_STORAGE_CART_KEY = 'cart';
const ProductCard = (props) =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        isAuth,
    } = useSelector(state => state.userBasket);

    const {
        id,
        name,
        picture,
        discountPercent,
        isInCart,
        isInLiked,
        price,
        isInStock,
        colorId,
    } = props;

    const [filled, setFilled] = useState(isInLiked);
    const [inCart, setInCart] = useState(isInCart);

    function HeartClick()
    {
        setFilled(!filled);
    }

    async function onCartAdd()
    {
        setInCart(!inCart);

        //Якщо користувач авторизований і треба додати в корзину
        if (isInCart === false && isAuth)
        {
            let cartFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY));
            if (cartFromLocalStorage !== null)
            {
                if (cartFromLocalStorage.every(item => item.productId !== id || item.colorId !== colorId))
                    await dispatch(addToCart(
                        {
                            productId: Number(id),
                            colorId: Number(colorId),
                        }
                    ))
                        .then(() =>
                        {
                            dispatch(getUserCart());
                        })
                else
                {
                    await dispatch(deleteFromCart(
                        {
                            productId: Number(id),
                            colorId: Number(colorId),
                        }
                    ))
                        .then(() =>
                        {
                            dispatch(getUserCart());
                        })
                }
            }
            else
            {
                await dispatch(addToCart(
                    {
                        productId: Number(id),
                        colorId: Number(colorId),
                    }
                ))
                    .then(() =>
                    {
                        dispatch(getUserCart());
                    })
            }
        }

        //Якщо користувач авторизований і треба видалити з корзини
        else if (isInCart && isAuth)
        {
            let cartFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY));

            if (cartFromLocalStorage !== null)
            {

                if (cartFromLocalStorage.some(item => item.productId === id || item.colorId === colorId))
                {
                    await dispatch(deleteFromCart(
                        {
                            productId: Number(id),
                            colorId: Number(colorId),
                        }
                    ))
                        .then(() =>
                        {
                            dispatch(getUserCart());
                        })
                }

                else
                {
                    await dispatch(addToCart(
                        {
                            productId: Number(id),
                            colorId: Number(colorId),
                        }
                    ))
                        .then(() =>
                        {
                            dispatch(getUserCart());
                        })
                }
            }
            else
            {
                await dispatch(deleteFromCart(
                    {
                        productId: Number(id),
                        colorId: Number(colorId),
                    }
                ))
                    .then(() =>
                    {
                        dispatch(getUserCart());
                    })
            }

        }

        // Якщо користувач не авторизований і треба добавити в корзину
        else if (isInCart === false && !isAuth)
        {
            var cart = [];

            let cartFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY));

            if (cartFromLocalStorage !== null)
            {
                if (cartFromLocalStorage.every(item => item.productId !== id || item.colorId !== colorId))
                    cart.push({
                        productId: Number(id),
                        colorId: Number(colorId),
                    });

                Object.values(cartFromLocalStorage).forEach(item =>
                {
                    if (item.productId !== id || item.colorId !== colorId)
                        cart.push(item);
                });
            }
            dispatch(setCartCount(cart.length));
            localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
        }
        //Якщо користувач не авторизований і треба видалити з корзини
        else
        {
            let cart = [];
            let cartFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY));

            if (cartFromLocalStorage !== null)
            {
                if (cartFromLocalStorage.some(item => item.productId === id || item.colorId === colorId))
                    cartFromLocalStorage = cartFromLocalStorage.filter(item => item.productId !== id || item.colorId !== colorId);
                else
                {
                    cartFromLocalStorage = cartFromLocalStorage.filter(item => item.productId !== id || item.colorId !== colorId);
                    cart.push({
                        productId: Number(id),
                        colorId: Number(colorId),
                    });
                }

                Object.values(cartFromLocalStorage).forEach(item =>
                {
                    cart.push(item);
                });
            }
            dispatch(setCartCount(cart.length));
            localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
        }
    }


    return (
        <Card
            sx={{
                width: "264px",
                height: "366px",
                borderRadius: '10px',
                background: '#F6F6F6',
                boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.08)',
                padding: "18px",


            }}
        >
            <div style={{ position: 'relative' }}>
                <CardMedia
                    id="imgContainer"
                    component="img"
                    height="196px"
                    width="228px"
                    image={picture}
                    alt="Product image"
                    sx={{
                        objectFit: 'contain',
                        background: 'white',
                        borderRadius: '4px',
                        transition: "transform .6s",
                        "&:hover": {
                            transform: "scale(1.2)"
                        }
                    }} />

                {
                    discountPercent > 0
                        ? (<div style={{ borderRadius: "60px", background: "#DCCBE5", position: "absolute", bottom: "12px", left: "12px", width: "52px", height: "30px", justifyContent: "center", alignItems: "center", display: "flex" }}>
                            <span id="salePercent" className='t2-bold'>-{discountPercent}%</span>
                        </div>) : (
                            <></>
                        )
                }

                <div id="heartBtn" onClick={HeartClick} style={{ position: "absolute", top: "12px", right: "12px" }}>
                    {filled === false ?
                        (<div id="heartIcon"><HeartIcon /></div>) :
                        (<div id="filledHeartIcon"><FilledHeartIcon /></div>)}
                </div>
            </div>

            <div style={{ position: 'relative' }}>
                <CardContent sx={{ padding: '0', paddingTop: '12px' }}>
                    <Typography
                        id="description"
                        className='t1-bold'
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#DA8D33'
                            }
                        }}
                        onClick={() =>
                        {
                            navigate('/product-page/' + id)
                        }}
                    >
                        {name}
                    </Typography>
                    {/* Можна виикориствоувати t2-medium-orange і t2-medium-green */}
                    <Typography id="availability" className={isInStock ? 't2-medium-green' : 't2-medium-orange'} sx={{ paddingTop: '12px' }}>
                        {isInStock ? 'В наявності' : 'Немає в наявності'}
                    </Typography>
                    <Typography id="price" className='t1-bold-red' sx={{ paddingTop: '12px' }}>
                        {Number(price) - Number(price) * Number(discountPercent) / 100} грн
                    </Typography>
                    {
                        discountPercent > 0 ? (
                            <Typography id="oldPrice" className='t2-medium' sx={{ textDecoration: 'line-through' }}>
                                {price} грн
                            </Typography>
                        ) : (<></>)
                    }

                    <div
                        style={{
                            position: "absolute",
                            bottom: "35px",
                            right: "12px",
                            cursor: "pointer"
                        }}
                        onClick={onCartAdd}
                    >
                        <Badge color="primary" badgeContent=" " variant="dot" overlap="circular" invisible={!inCart} >
                            <CartIcon></CartIcon>
                        </Badge>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

export default ProductCard;