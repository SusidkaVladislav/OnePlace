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
import { useNavigate } from "react-router-dom";

const { REACT_APP_BASE_URL } = process.env;
const LOCAL_STORAGE_TOKEN_KEY = "access-token";

const NO_SERVER_CONNECTION_PATH = "/no_server_connection";
const UserPrivateRoute = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        beforeAuthPath
    } = useSelector(state => state.userAuth);

    const {
        likedProductsServerConnectionError
    } = useSelector(state => state.userLikedProducts);

    const {
        cartServerConnectionError
    } = useSelector(state => state.userBasket);

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

                            setIsAuth(true);
                            dispatch(setIsAuthState(true));
                            dispatch(getUserCart());
                            dispatch(getLikedProducts())
                            setIsAuthInProgress(false)
                        }
                        else
                        {
                            setIsUser(false)

                            dispatch(setIsAuthState(false));
                            setIsAuthInProgress(false)
                        }
                    })
                    .catch((error) =>
                    {
                        // if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))
                        // {
                        //     localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
                        // }

                        setIsAuth(false);
                        setIsUser(false);
                        dispatch(setIsAuthState(false));
                        setIsAuthInProgress(false);
                    });
            }
            catch (error)
            {

                setIsAuth(false);
                dispatch(setIsAuthState(false));
                setIsAuthInProgress(false);
            }
        }
        else
        {

            setIsAuth(false);
            setIsUser(false)
            dispatch(setIsAuthState(false));
            setIsAuthInProgress(false);
        }
    }, [])

    if (likedProductsServerConnectionError || cartServerConnectionError)
    {
        navigate(NO_SERVER_CONNECTION_PATH)
    }

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