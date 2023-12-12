import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import
{
    getProductById,
    getProductRaitingInfo,
} from '../main/features/products/userProductSlice';

import
{
    getProductReviews,
} from '../main/features/analitics/userAnaliticSlice';

import
{
    getUserPersonalData,
} from '../main/features/userAuth/userAuthSlice';

import
{
    setName,
    setEmail,
} from '../main/features/products/userViewProduct';

import
{
    getUserCart,
} from '../main/features/basket/cartSlice';

import Header from '../main/components/header/Header';
import Footer from '../main/components/footer/Footer';
import ProductInfo from './product-info/productInfo';
import CategorySelectBox from '../main/controls/CategorySelectBox';

import
{
    useMediaQuery,
} from '@mui/material';

const ProductPage = () =>
{
    const params = useParams();
    const dispatch = useDispatch();

    const md = useMediaQuery('(min-width: 900px)');

    const [productId, setProductId] = useState(params.id);

    const {
        loadingProduct,
        loadingRating,
    } = useSelector(state => state.userProducts)

    const {
        analiticLoading,
    } = useSelector(state => state.userAnalitic);

    const {
        isCategoryOpen,
    } = useSelector(state => state.userCategories);

    useEffect(() =>
    {
        if (localStorage.getItem("cart") === null)
            localStorage.setItem("cart", JSON.stringify([]));

        //Якщо користувач авторизований, то з БД підтягуєтсья корзина того кориcтувача,
        // якщо не авторизований, то нічого не міняєтсья
        dispatch(getUserCart());

        setProductId(params.id)
        dispatch(getProductById(Number(params.id)));
        dispatch(getProductRaitingInfo(Number(params.id)))
        dispatch(getProductReviews(Number(params.id)))

        dispatch(getUserPersonalData())
            .then(({ payload }) =>
            {
                dispatch(setName(payload?.data?.name !== undefined ? payload?.data?.name : ''))
                dispatch(setEmail(payload?.data?.email ? payload?.data?.email : ''))
            })

    }, [params.id])

    if (loadingProduct)
    {
        return <></>
    }
    if (loadingRating)
    {
        return <></>
    }
    if (analiticLoading)
    {
        return <></>
    }
    return (
        <div>
            <Header />
            {
                isCategoryOpen && md && (
                    <CategorySelectBox />
                )
            }
            <ProductInfo />
            <Footer />
        </div>
    )
}

export default ProductPage