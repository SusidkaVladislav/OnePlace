import { Navigate } from "react-router-dom";
import React from 'react'
import { useSelector } from "react-redux";
import CheckoutPage from '../modules/main/pages/checkout/CheckoutPage';

const ProtectedCartRoute = () =>
{
    const {
        checkedProductIds,
    } = useSelector(state => state.userBasket)


    if (checkedProductIds?.length > 0)
    {
        return <CheckoutPage />
    }
    else
    {
        return <Navigate to={'/'} />;
    }
};

export default ProtectedCartRoute;