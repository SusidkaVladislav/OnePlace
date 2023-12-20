import React, { useEffect, Fragment, useState } from 'react';
import Header from '../../components/header/Header';
import { useDispatch, useSelector } from "react-redux"
import
{
    getCategoriesForSelect,
    setIsCategoryOpen,
} from '../../features/categories/userCategorySlice';

import
{
    getProductsFromCart
} from '../../features/basket/cartSlice';

import "./BasketStyle.css";
import CategorySelectBox from '../../controls/CategorySelectBox';

import OrdersGridView from "./OrdersGridView"
import
{
    useMediaQuery
} from '@mui/material';

const Basket = () =>
{
    const dispatch = useDispatch();
    const md = useMediaQuery('(min-width: 900px)');
    const {
        isCategoryOpen,
    } = useSelector(state => state.userCategories);

    useEffect(() =>
    {
        dispatch(getCategoriesForSelect())
        let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
        if (cartFromLocalStorage !== null)
        {
            dispatch(getProductsFromCart(cartFromLocalStorage))
        }
        else
        {
            localStorage.setItem("cart", JSON.stringify([]));
        }
    }, [])

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

    return (
        <Fragment>
            <Header />
            {
                isCategoryOpen && md && (
                    <CategorySelectBox />
                )
            }
            <OrdersGridView />
        </Fragment>
    )

}
export default Basket;