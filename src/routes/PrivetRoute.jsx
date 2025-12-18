import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../pages/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({ children }) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading) {
        return <Loading></Loading>;
    }

    if(user && user?.email ) {
        return children;
    }

    return (
        <Navigate to="/login" state={{ from: location.pathname }} replace />);
};

export default PrivetRoute;