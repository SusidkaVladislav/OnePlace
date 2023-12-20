import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import jwt from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux";
import
{
    setIsAuthState
} from '../modules/main/features/userAuth/userAuthSlice';
import
{
    getLikedProducts,
} from '../modules/main/features/liked-products/likedProductsSlice';

import
{
    getUserCart
} from '../modules/main/features/basket/cartSlice';

import LoadingAnimation from '../common-elements/loading/LoadingAnimation';

const { REACT_APP_BASE_URL } = process.env;
const LOCAL_STORAGE_TOKEN_KEY = "access-token";

const UserPrivateRoute = () =>
{
    const dispatch = useDispatch();

    const {
        beforeAuthPath
    } = useSelector(state => state.userAuth);

    const [isAuthInProgress, setIsAuthInProgress] = useState(true);
    const [isUser, setIsUser] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(beforeAuthPath)

    useEffect(() =>
    {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        if (accessToken)
        {
            try
            {
                axios.post(`${REACT_APP_BASE_URL}/Account/refresh`,
                    null,
                    {
                        params: {
                            accessToken: accessToken,
                        },
                        withCredentials: true,
                    })
                    .then((response) =>
                    {
                        // var oldToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
                        // if (oldToken)
                        // {
                        //     localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
                        // }
                        const user = jwt(response.data);
                        const role = user["Role"];
                        if (role === "user")
                        {
                            setIsUser(true)
                            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.data);
                            setIsAuthInProgress(false)
                            setIsAuth(true);
                            dispatch(setIsAuthState(true));
                            dispatch(getUserCart());
                            dispatch(getLikedProducts())
                        }
                        else
                        {
                            setIsUser(false)
                            setIsAuthInProgress(false)
                            dispatch(setIsAuthState(false));
                        }
                    })
                    .catch((error) =>
                    {
                        // if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))
                        // {
                        //     localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
                        // }
                        setIsAuthInProgress(false);
                        setIsAuth(false);
                        setIsUser(false);
                        dispatch(setIsAuthState(false));
                    });
            }
            catch (error)
            {
                setIsAuthInProgress(false);
                setIsAuth(false);
                dispatch(setIsAuthState(false));
            }
        }
        else
        {
            setIsAuthInProgress(false);
            setIsAuth(false);
            setIsUser(false)
            dispatch(setIsAuthState(false));
        }
    }, [])

    if (isAuthInProgress)
    {
        return <LoadingAnimation />;
    }
    if (isAuth && isUser)
    {
        return <Outlet />
    }
    else
    {
        return <Navigate to={currentUrl} />;
    }
};

export default UserPrivateRoute;