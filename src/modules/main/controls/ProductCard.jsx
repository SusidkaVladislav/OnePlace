import React, { useState } from 'react';
import
{
    Badge,
    Typography,
    CardMedia,
    CardContent,
    Card,
    useMediaQuery,
} from '@mui/material'
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

import
{
    addToLiked,
    deleteFromLiked,
    getLikedProducts,
    setLikedProductsCount,
} from '../../main/features/liked-products/likedProductsSlice';

import
{
    setIsLoginFormOpen,
} from '../../main/features/userAuth/userAuthSlice';


const LOCAL_STORAGE_CART_KEY = 'cart';
const ProductCard = (props) =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const xs = useMediaQuery('(min-width: 0px)');
    const sm = useMediaQuery('(min-width: 600px)');
    const md1 = useMediaQuery('(min-width: 800px)');
    const md = useMediaQuery('(min-width: 900px)');
    const lg = useMediaQuery('(min-width: 1200px)');

    const {
        isAuth,
    } = useSelector(state => state.userBasket);


    const {
        likedProductsCount,
    } = useSelector(state => state.userLikedProducts);

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
                width: md ? "264px" : md1 ? "300px" : sm ? "264px" : "85%",
                height: sm ? "366px" : "270px",
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
                    image={picture}
                    alt="Product image"
                    sx={{
                        height: sm ? "196px" : "110px",
                        width: md ? "228px" : md1 ? "266px" : sm ? "228px" : "100%",
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

                <div id="heartBtn" style={{ position: "absolute", top: "12px", right: "12px" }}>
                    {filled === false ?

                        <div id="heartIcon"
                            onClick={async () =>
                            {

                                //Додати товар до улюблених
                                await dispatch(addToLiked(Number(id)))
                                    .unwrap()
                                    .then(() =>
                                    {
                                        dispatch(setLikedProductsCount(likedProductsCount + 1))
                                        dispatch(getLikedProducts())
                                        setFilled(!filled)
                                    })
                                    .catch(() =>
                                    {
                                        dispatch(setIsLoginFormOpen(true))
                                    })
                            }}
                        >
                            <HeartIcon />
                        </div> :

                        <div id="filledHeartIcon"
                            style={{
                                cursor: 'pointer'
                            }}
                            onClick={async () =>
                            {
                                setFilled(!filled)
                                await dispatch(deleteFromLiked(Number(id)))
                                    .then(() =>
                                    {
                                        dispatch(setLikedProductsCount(likedProductsCount - 1))
                                    })
                            }}
                        >
                            <FilledHeartIcon />
                        </div>
                    }
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
                            bottom: "25px",
                            right: "5px",
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