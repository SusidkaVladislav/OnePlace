import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const AdminPrivateRoute = () =>
{
    const {
        isAuth, isAuthInProgress, role
    } = useSelector(state => state.adminAuth);

    if (isAuthInProgress)
    {
        return <div>Checking auth...</div>;
    }
    if (isAuth && role === "admin")
    {
        return <Outlet />
    }
    else
    {
        return <Navigate to="/admin" />;
    }
};

export default AdminPrivateRoute;