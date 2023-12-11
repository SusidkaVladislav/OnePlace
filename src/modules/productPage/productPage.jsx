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

import Header from '../main/components/header/Header';
import Footer from '../main/components/footer/Footer';
import ProductInfo from './product-info/productInfo';

const ProductPage = () =>
{
    const params = useParams();
    const dispatch = useDispatch();

    const [productId, setProductId] = useState(params.id);

    const {
        loadingProduct,
        loadingRating,
    } = useSelector(state => state.userProducts)

    const {
        analiticLoading,
    } = useSelector(state => state.userAnalitic);

    useEffect(() =>
    {
        setProductId(params.id)
        dispatch(getProductById(Number(params.id)));
        dispatch(getProductRaitingInfo(Number(params.id)))
        dispatch(getProductReviews(Number(params.id)))

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
            <ProductInfo />
            <Footer />
        </div>
    )
}

export default ProductPage