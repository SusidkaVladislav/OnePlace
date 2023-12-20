import React, { useEffect, useState } from 'react';
import "./MyDesires.css";
import TrashIcon from '../../../../svg/user-cabinet/favourites/TrashIcon';
import CartIcon from '../../../../svg/client-icons/header/CartIcon';

import
{
    Badge,
    Typography,
    Grid,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import
{
    getLikedProducts,
    getLikedProductsData,
    deleteFromLiked,
} from '../../../main/features/liked-products/likedProductsSlice';

import
{
    deleteFromCart,
    addToCart,
    getUserCart,
} from '../../../main/features/basket/cartSlice';
import LoadingAnimation from '../../../../common-elements/loading/LoadingAnimation';

const LOCAL_STORAGE_CART_KEY = 'cart';
const MyDesires = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [refreshPage, setRefreshPage] = useState(false)

    const {
        likedProductLoading,
        likedProductsDataLoading,
        likedProductsData,
    } = useSelector(state => state.userLikedProducts);

    useEffect(() =>
    {
        dispatch(getLikedProducts()).then(({ payload }) =>
        {
            const ids = [];
            payload?.map(({ productId }) =>
            {
                ids.push(productId);
            })
            dispatch(getLikedProductsData(ids))
        })
    }, [refreshPage])


    if (likedProductLoading)
    {
        return (
            <Grid
                sx={{
                    minHeight: '100vh'
                }}
            >
                <LoadingAnimation />
            </Grid>
        )
    }
    if (likedProductsDataLoading)
    {
        return (
            <Grid
                sx={{
                    minHeight: '100vh'
                }}
            >
                <LoadingAnimation />
            </Grid>
        )
    }
    return (
        <div className='md-div'>
            <Grid container className='md-container1'>
                {likedProductsData?.map((product, index) => (
                    <Grid key={index} item xs={12} xl={12} className='md-container2'>
                        <img src={product?.picture} className='md-product-image'></img>
                        <Grid container>
                            <Grid item xs={12} s={10} md={10} xl={10} className='md-container3'>
                                <div>
                                    <h5
                                        className="light"
                                        style={{
                                            cursor: 'pointer',
                                            width: 'fit-content',
                                        }}
                                        onClick={() =>
                                        {
                                            navigate(`/product-page/${product?.id}`)
                                        }}
                                    >{product?.name}</h5>
                                    <Typography className="t1-bold-orange1">{product?.isInStock ? 'В наявності' : 'Немає'}</Typography>
                                </div>
                                <div>
                                    {
                                        product?.discountPercent > 0 ? (
                                            <Typography id="oldPrice" className='t2-medium' sx={{ textDecoration: 'line-through' }}>
                                                {product?.price} грн
                                            </Typography>
                                        ) : (<></>)
                                    }
                                    < h5 className='bold-red'> {Number(product?.price) - Number(product?.price) * Number(product?.discountPercent) / 100} грн</h5>
                                </div>
                            </Grid>
                            <Grid item xs={12} s={2} md={2} xl={2}>
                                <Grid container>
                                    <Grid item xs={7} s={12} md={12} xl={12} >
                                        <span
                                            onClick={async () =>
                                            {
                                                await dispatch(deleteFromLiked(Number(product?.id))).then(() =>
                                                {
                                                    setRefreshPage(!refreshPage)
                                                })
                                            }}
                                        >
                                            <TrashIcon />
                                        </span>
                                    </Grid>
                                    <Grid item xs={0} s={12} md={12} xl={12} sx={{ height: "70px" }}></Grid>
                                    <Grid item xs={5} s={12} md={12} xl={12}>
                                        <span
                                            onClick={async () =>
                                            {
                                                let cartFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY));
                                                if (product?.isInCart !== true)
                                                {
                                                    if (cartFromLocalStorage !== null)
                                                    {
                                                        if (cartFromLocalStorage.every(item => item.productId !== product?.id || item.colorId !== product?.colorId))
                                                            await dispatch(addToCart(
                                                                {
                                                                    productId: Number(product?.id),
                                                                    colorId: Number(product?.colorId),
                                                                }
                                                            ))
                                                                .then(() =>
                                                                {
                                                                    dispatch(getUserCart());
                                                                    setRefreshPage(!refreshPage)
                                                                })
                                                        else
                                                        {
                                                            await dispatch(deleteFromCart(
                                                                {
                                                                    productId: Number(product?.id),
                                                                    colorId: Number(product?.colorId),
                                                                }
                                                            ))
                                                                .then(() =>
                                                                {
                                                                    dispatch(getUserCart());
                                                                    setRefreshPage(!refreshPage)
                                                                })
                                                        }
                                                    }
                                                }
                                                else
                                                {
                                                    let cartFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY));

                                                    if (cartFromLocalStorage !== null)
                                                    {

                                                        if (cartFromLocalStorage.some(item => item.productId === product?.id || item.colorId === product?.colorId))
                                                        {
                                                            await dispatch(deleteFromCart(
                                                                {
                                                                    productId: Number(product?.id),
                                                                    colorId: Number(product?.colorId),
                                                                }
                                                            ))
                                                                .then(() =>
                                                                {
                                                                    dispatch(getUserCart());
                                                                    setRefreshPage(!refreshPage)
                                                                })
                                                        }

                                                        else
                                                        {
                                                            await dispatch(addToCart(
                                                                {
                                                                    productId: Number(product?.id),
                                                                    colorId: Number(product?.colorId),
                                                                }
                                                            ))
                                                                .then(() =>
                                                                {
                                                                    dispatch(getUserCart());
                                                                    setRefreshPage(!refreshPage)
                                                                })
                                                        }
                                                    }
                                                    else
                                                    {
                                                        await dispatch(deleteFromCart(
                                                            {
                                                                productId: Number(product?.id),
                                                                colorId: Number(product?.colorId),
                                                            }
                                                        ))
                                                            .then(() =>
                                                            {
                                                                dispatch(getUserCart());
                                                                setRefreshPage(!refreshPage)
                                                            })
                                                    }
                                                }
                                            }}
                                        >
                                            <Badge color="primary" badgeContent=" " variant="dot" overlap="circular" invisible={!product?.isInCart} >
                                                <CartIcon />
                                            </Badge>
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div >
    )
}

export default MyDesires;