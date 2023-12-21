import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import
{
    getProductById,
    getProductRaitingInfo,
    getInterestingProducts,
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

import
{
    isProductInLiked,
} from '../main/features/liked-products/likedProductsSlice';

import
{
    setIsCategoryOpen
} from '../main/features/categories/userCategorySlice';

import Header from '../main/components/header/Header';
import Footer from '../main/components/footer/Footer';
import ProductInfo from './product-info/productInfo';
import CategorySelectBox from '../main/controls/CategorySelectBox';

import
{
    useMediaQuery,
} from '@mui/material';

import LoadingAnimation from '../../common-elements/loading/LoadingAnimation';
import { useNavigate } from 'react-router-dom';

const NO_SERVER_CONNECTION_PATH = "/no_server_connection";
const ProductPage = () =>
{
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const md = useMediaQuery('(min-width: 900px)');

    const [productId, setProductId] = useState(params.id);

    const {
        loadingProduct,
        loadingRating,
        loadingInterestingProducts,
        productServerConnectionError,
    } = useSelector(state => state.userProducts)

    const {
        analiticLoading,
        analiticServerConnectionError,
    } = useSelector(state => state.userAnalitic);

    const {
        authServerConnectionError,
        userPersonalDataLoading,
    } = useSelector(state => state.userAuth);

    const {
        cartServerConnectionError
    } = useSelector(state => state.userBasket);

    const {
        likedProductsServerConnectionError
    } = useSelector(state => state.userLikedProducts);

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
        dispatch(getProductById(Number(params.id)))
            .then(({ payload }) =>
            {
                dispatch(getInterestingProducts(Number(payload?.categoryId)))
            });
        dispatch(getProductRaitingInfo(Number(params.id)))
        dispatch(getProductReviews(Number(params.id)))

        dispatch(getUserPersonalData())
            .then(({ payload }) =>
            {
                dispatch(setName(payload?.data?.name !== undefined ? payload?.data?.name : ''))
                dispatch(setEmail(payload?.data?.email ? payload?.data?.email : ''))
            })

        dispatch(isProductInLiked(Number(params.id)));
    }, [params.id])

    const [step, setStep] = useState(2);

    useEffect(() =>
    {
        const handleResize = () =>
        {
            const isLg = window.matchMedia('(min-width: 1200px)').matches;
            const isMd = window.matchMedia('(min-width: 900px)').matches;

            if (isLg)
            {
                setStep(4);
            } else if (isMd)
            {
                setStep(3);
            } else
            {
                setStep(2);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () =>
        {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() =>
    {
        if (step === 2)
        {
            dispatch(setIsCategoryOpen(false))
        }
    }, [step]);

    if (productServerConnectionError || analiticServerConnectionError || authServerConnectionError || cartServerConnectionError || likedProductsServerConnectionError)
    {
        navigate(NO_SERVER_CONNECTION_PATH)
    }

    if (loadingProduct)
    {
        return <LoadingAnimation />
    }
    if (loadingRating)
    {
        return <LoadingAnimation />
    }
    if (analiticLoading)
    {
        return <LoadingAnimation />
    }
    if (userPersonalDataLoading)
    {
        return <LoadingAnimation />
    }
    if (loadingInterestingProducts)
    {
        return <LoadingAnimation />
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