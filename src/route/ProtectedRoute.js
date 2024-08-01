import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;