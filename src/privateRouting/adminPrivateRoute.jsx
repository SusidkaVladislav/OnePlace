import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import jwt from 'jwt-decode'

const { REACT_APP_BASE_URL } = process.env;

const AdminPrivateRoute = () =>
{
    const [isAuthInProgress, setIsAuthInProgress] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() =>
    {
        const accessToken = localStorage.getItem("access-token");
        
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
                        var oldToken = localStorage.getItem("access-token")
                        if (oldToken)
                        {
                            localStorage.removeItem("token");
                        }
                        const user = jwt(response.data);
                        const role = user["Role"];
                        if (role === "admin")
                        {
                            setIsAdmin(true)
                            localStorage.removeItem("email");
                            localStorage.setItem("access-token", response.data);
                            setIsAuthInProgress(false)
                            setIsAuth(true);
                        }
                        else
                        {
                            setIsAdmin(false)
                            setIsAuthInProgress(false)
                        }

                    })
                    .catch(() =>
                    {
                        if (localStorage.getItem("access-token"))
                        {
                            localStorage.removeItem("access-token");
                        }
                        setIsAuthInProgress(false)
                        setIsAuth(false);
                        setIsAdmin(false)

                    });
            }
            catch (error)
            {
                setIsAuthInProgress(false)
                setIsAuth(false);
            }
        }
        else
        {
            setIsAuthInProgress(false)
            setIsAuth(false);
            setIsAdmin(false)
        }
    }, [])

    if (isAuthInProgress)
    {
        return <div></div>;
    }
    if (isAuth && isAdmin)
    {
        return <Outlet />
    }
    else
    {
        return <Navigate to="/admin" />;
    }
};

export default AdminPrivateRoute;