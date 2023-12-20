import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import
{
    resetServerConnectionError,
} from '../../modules/main/features/categories/userCategorySlice';

import
{
    resetAnalicticServerConnectionError
} from '../../modules/main/features/analitics/userAnaliticSlice';

import
{
    resetCategoryServerConnectionError
} from '../../modules/main/features/basket/cartSlice';

import
{
    resetLikedProductsServerConnectionError
} from '../../modules/main/features/liked-products/likedProductsSlice';

import
{
    resetLoginServerConnectionError
} from '../../modules/main/features/login/userLoginSlice';

import
{
    resetMessagesServerConnectionError,
} from '../../modules/main/features/messages/userMessageSlice';

import
{
    resetOrderServerConnectionError
} from '../../modules/main/features/order/userOrderSlice';

const NoServerConnection = () =>
{
    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(resetServerConnectionError());
        dispatch(resetAnalicticServerConnectionError());
        dispatch(resetCategoryServerConnectionError());
        dispatch(resetLikedProductsServerConnectionError());
        dispatch(resetLoginServerConnectionError());
        dispatch(resetMessagesServerConnectionError());
        dispatch(resetOrderServerConnectionError());
    }, [])

    return (
        <></>
    )
}

export default NoServerConnection;