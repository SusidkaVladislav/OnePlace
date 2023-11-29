import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../components/header/Header';
import { useDispatch, useSelector } from "react-redux"
import
{
    getCategoriesForSelect
} from '../../features/categories/userCategorySlice';

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