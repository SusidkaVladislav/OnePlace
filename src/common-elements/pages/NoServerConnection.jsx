import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import
{
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material'
import SadCharacterIcon from '../../svg/shared-icons/SadCharacterIcon';

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
    resetCartServerConnectionError
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

import
{
    resetProductServerConnectionError
} from '../../modules/main/features/products/userProductSlice';

import
{
    resetRegisterServerConnectionError
} from '../../modules/main/features/register/userRegisterSlice';

import
{
    resetAuthServerConnectionError
} from '../../modules/main/features/userAuth/userAuthSlice';

import
{
    resetMyMessagesServerConnectionError
} from '../../modules/client-area/features/messages/myMessagesSlice';

import
{
    resetMyOrdersServerConnectionError
} from '../../modules/client-area/features/orders/myOrdersSlics';

import
{
    resetMyPersonalDataServerConnectionError
} from '../../modules/client-area/features/personal-data/myPersonalDataSlice';

import
{
    resetMyProductsServerConnectionError
} from '../../modules/client-area/features/products/myProductsSlice';

import
{
    resetMyReviewsServerConnectionError
} from '../../modules/client-area/features/reviews/myReviewsSlice';

const NoServerConnection = () =>
{
    const dispatch = useDispatch();

    const xs = useMediaQuery('(min-width: 0px)');
    const md = useMediaQuery('(min-width: 900px)');

    useEffect(() =>
    {
        dispatch(resetServerConnectionError());
        dispatch(resetAnalicticServerConnectionError());
        dispatch(resetCartServerConnectionError());
        dispatch(resetLikedProductsServerConnectionError());
        dispatch(resetLoginServerConnectionError());
        dispatch(resetMessagesServerConnectionError());
        dispatch(resetOrderServerConnectionError());
        dispatch(resetProductServerConnectionError());
        dispatch(resetRegisterServerConnectionError());
        dispatch(resetAuthServerConnectionError());
        dispatch(resetMyMessagesServerConnectionError());
        dispatch(resetMyOrdersServerConnectionError());
        dispatch(resetMyPersonalDataServerConnectionError());
        dispatch(resetMyProductsServerConnectionError());
        dispatch(resetMyReviewsServerConnectionError())
    }, [])

    return (
        <Grid
            container
            item
            xs={12}
            sx={{
                marginTop: '50px'
            }}
            direction={'column'}
        >
            <Grid
                container
                justifyContent={'center'}
                alignContent={'center'}
            >
                <Typography
                    className={
                        md ? 'brown1-500-52' : 'brown1-500-18'
                    }
                >Сервер не знайдено</Typography>
            </Grid>

            <Grid
                container
                justifyContent={'center'}
            >
                <Typography
                    className={
                        md ? 'brown1-500-52' : 'brown1-500-18'
                    }
                >500</Typography>
            </Grid>
            <Grid
                container
                justifyContent={'center'}
                sx={{
                    marginTop: '50px'
                }}
            >
                <SadCharacterIcon />
            </Grid>
        </Grid>
    )
}

export default NoServerConnection;