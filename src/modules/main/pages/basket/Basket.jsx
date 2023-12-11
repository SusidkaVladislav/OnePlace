import React, { useEffect, Fragment } from 'react';
import Header from '../../components/header/Header';
import { useDispatch, useSelector } from "react-redux"
import
{
    getCategoriesForSelect
} from '../../features/categories/userCategorySlice';

import
{
    getProductsFromCart
} from '../../features/basket/cartSlice';

import "./BasketStyle.css";
import CategorySelectBox from '../../controls/CategorySelectBox';

import OrdersGridView from "./OrdersGridView"


const Basket = () =>
{
    const dispatch = useDispatch();

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
    }, [])

    return (
        <Fragment>
            <Header />
            {
                isCategoryOpen && (
                    <CategorySelectBox />
                )
            }
            <OrdersGridView />
        </Fragment>
    )

}
export default Basket;