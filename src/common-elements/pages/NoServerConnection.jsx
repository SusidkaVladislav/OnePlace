import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import
{
    resetServerConnectionError
} from '../../modules/main/features/categories/userCategorySlice';

const NoServerConnection = () =>
{
    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(resetServerConnectionError());
    }, [])

    return (
        <></>
    )
}

export default NoServerConnection;