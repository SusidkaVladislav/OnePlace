import React, { useState, useEffect, Fragment, } from 'react';

import
{
    Typography,
    Button,
    Badge,
} from '@mui/material';

import ShareIcon from '../../../svg/client-icons/productPage/ShareIcon';
import BigHeartIcon from '../../../svg/client-icons/productPage/BigHeartIcon';
import BigFilledHeartIcon from '../../../svg/client-icons/productPage/BigFilledHeartIcon';
import AddReviewIcon from '../../../svg/client-icons/productPage/AddReviewIcon';
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';

import
{
    setActiveTab,
} from '../../main/features/products/userViewProduct';

import
{
    addToLiked,
    deleteFromLiked,
} from '../../main/features/liked-products/likedProductsSlice';

import
{
    addToCart,
    getUserCart,
    setCartCount,
} from '../../main/features/basket/cartSlice';

import
{
    refreshToken,
} from '../../main/features/userAuth/userAuthSlice';

import
{
    setIsLoginFormOpen,
} from '../../main/features/userAuth/userAuthSlice';

import { useDispatch, useSelector } from 'react-redux';

import LoadingAnimation from '../../../common-elements/loading/LoadingAnimation';

const LOCAL_STORAGE_CART_KEY = 'cart';
const QuickProductNav = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        product,
        productRaitingInfo,
    } = useSelector(state => state.userProducts);

    const {
        isAuth,
    } = useSelector(state => state.userBasket);

    const {
        isInLiked,
        likedProductLoading,
    } = useSelector(state => state.userLikedProducts);

    const [currentColorProductConfig, setCurrentColorProductConfig] = useState({})
    const [rating, setRating] = useState({});

    useEffect(() =>
    {
        setCurrentColorProductConfig({
            colorId: product?.productColors?.[0]?.color?.id,
            colorName: product?.productColors?.[0]?.color?.name,
            price: product?.productColors?.[0]?.price,
            quantity: product?.productColors?.[0]?.quantity,
        });

        setRating(
            {
                starsCount: productRaitingInfo?.startsCount,
                reviewsCount: productRaitingInfo?.reviewsCount,
                averageValue: productRaitingInfo?.averageValue,
            }
        )
    }, [])

    const onAddToCart = async () =>
    {
        await dispatch(refreshToken())
            .then(() =>
            {
                let cart = [];
                let cartFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY));
                if (cartFromLocalStorage !== null)
                {
                    Object.values(cartFromLocalStorage).forEach(item =>
                    {
                        cart.push(item);
                    });
                }

                const productsById = cart?.filter(item => item?.productId === product?.id);
                const isNotInCart = productsById?.every(item => item?.colorId !== currentColorProductConfig?.colorId)

                if (isNotInCart && isAuth)
                {
                    let cartFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY));

                    if (cartFromLocalStorage !== null)
                    {
                        //await
                        dispatch(addToCart(
                            {
                                productId: Number(product?.id),
                                colorId: Number(currentColorProductConfig?.colorId),
                            }
                        ))
                            .then(() =>
                            {
                                dispatch(getUserCart());
                                navigate('/basket')
                            })
                    }
                }
                if (isNotInCart && !isAuth)
                {
                    cart = [];

                    let cartFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY));

                    if (cartFromLocalStorage !== null)
                    {
                        cart.push({
                            productId: Number(product?.id),
                            colorId: Number(currentColorProductConfig?.colorId),
                        });

                        Object.values(cartFromLocalStorage).forEach(item =>
                        {
                            if (item?.productId !== product?.id || item?.colorId !== currentColorProductConfig?.colorId)
                                cart.push(item);
                        });
                    }
                    dispatch(setCartCount(cart.length));
                    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
                    navigate('/basket')
                }

                if (!isNotInCart)
                {
                    navigate('/basket')
                }
            })
    }


    if (likedProductLoading)
    {
        return <LoadingAnimation/>
    }
    return (
        <div
            style={{
                borderRadius: "10px",
                boxShadow: "1px 1px 8px 0px rgba(0, 0, 0, 0.08)",
                width: "100%",
            }}>
            <div style={{ padding: "22px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={product?.pictures?.find(img => img?.isTitle === true)?.address}
                        style={{
                            padding: "2px",
                            height: "79px",
                            width: "82px",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            boxShadow: "1px 1px 8px 0px rgba(0, 0, 0, 0.08)",
                            objectFit: "contain"
                        }}></img>
                    <div style={{ width: "24px" }}></div>
                    <h4>{product?.name}</h4>
                </div>

                <div className='hl'></div>

                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div style={{
                        display: "flex",
                        width: '60%',
                        gap: '5%',
                    }}>
                        <h4 className='red'>{
                            product?.sale !== null ?
                                currentColorProductConfig?.price - (currentColorProductConfig?.price * product?.sale?.discountPercent / 100)
                                : currentColorProductConfig?.price
                        }грн</h4>

                        <Typography
                            className='t2-medium'
                            sx={{
                                display: product?.sale !== null ? 'flex' : 'none',
                                textDecoration: 'line-through'
                            }}>{product?.sale !== null ? currentColorProductConfig?.price : 0}
                            грн</Typography>
                    </div>
                    <Typography className={currentColorProductConfig?.quantity > 0 ? 't1-bold-green' : 't1-bold-red'}>
                        {currentColorProductConfig?.quantity > 0 ? 'В наявності' : 'Немає'}</Typography>
                </div>

                <div className='hl'></div>

                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <Typography className='t1-bold'>Колір: {currentColorProductConfig?.colorName}</Typography>
                    <div style={{ display: "flex" }}>
                        {
                            product?.productColors?.map((productColor, index) =>
                            {
                                return (
                                    <Fragment
                                        key={index}
                                    >
                                        {
                                            productColor?.color?.name === currentColorProductConfig?.colorName ?
                                                (
                                                    <Badge
                                                        color="warning"
                                                        variant="dot"
                                                        overlap="circular"
                                                    >
                                                        <div
                                                            className='aap-color-circle'
                                                            style={{
                                                                backgroundColor: productColor?.color.hex,
                                                                display: 'flex'
                                                            }}
                                                            onClick={() =>
                                                            {
                                                                setCurrentColorProductConfig({
                                                                    colorId: productColor?.color?.id,
                                                                    colorName: productColor?.color?.name,
                                                                    price: productColor?.price,
                                                                    quantity: productColor?.quantity,
                                                                });
                                                            }}
                                                        >
                                                        </div>
                                                    </Badge>
                                                ) :
                                                (
                                                    <div
                                                        className='aap-color-circle'
                                                        style={{
                                                            backgroundColor: productColor?.color.hex,
                                                            display: 'flex'
                                                        }}
                                                        onClick={() =>
                                                        {
                                                            setCurrentColorProductConfig({
                                                                colorId: productColor?.color?.id,
                                                                colorName: productColor?.color?.name,
                                                                price: productColor?.price,
                                                                quantity: productColor?.quantity,
                                                            });
                                                        }}
                                                    >
                                                    </div>
                                                )
                                        }
                                        <div style={{ width: "5px" }}></div>
                                    </Fragment>

                                )
                            })
                        }
                    </div>
                </div>

                <div className='hl'></div>

                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Button
                        variant="contained"
                        className="aap-button"
                        onClick={() =>
                        {
                            //Добавити в кошик
                            onAddToCart()
                        }}
                    >Купити</Button>

                    <div
                        style={{ display: "flex", paddingTop: "9px" }}
                        onClick={() =>
                        {
                            navigator.clipboard.writeText(window.location.href)
                                .catch(() =>
                                {
                                    console.log('Write permission denied.')
                                });
                        }}
                    >
                        <ShareIcon />
                        <div style={{ width: "20px" }}></div>

                        <div
                            id="heartBtn"
                        >
                            {isInLiked === false ?
                                <span
                                    id="heartIcon"
                                    onClick={async () =>
                                    {
                                        //Додати товар до улюблених
                                        await dispatch(addToLiked(Number(product?.id))).unwrap().catch((error) =>
                                        {
                                            if (error.status === 401)
                                                dispatch(setIsLoginFormOpen(true))
                                        })
                                    }}
                                >
                                    <BigHeartIcon />
                                </span> :
                                <span
                                    id="filledHeartIcon"
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={async () =>
                                    {
                                        //Видалити товар з улюблених
                                        await dispatch(deleteFromLiked(Number(product?.id)))
                                    }}
                                >
                                    <BigFilledHeartIcon />
                                </span>
                            }
                        </div>

                        <div style={{ width: "20px" }}></div>
                        <span onClick={() =>
                        {
                            dispatch(setActiveTab('messages'))
                        }}>
                            <AddReviewIcon />
                        </span>
                    </div>
                </div>

                <div className='aap-star-rating-container'>
                    <StarRating
                        defaultRating={rating?.starsCount}
                    />
                    <Typography
                        className='t2-medium-blue'
                        style={{ display: "inline", paddingTop: "5px" }}
                    >
                        {rating?.averageValue} ({rating?.reviewsCount} оцінок)
                    </Typography>
                </div>

                <div className='hl'></div>
            </div>
        </div>
    )
}

export default QuickProductNav;