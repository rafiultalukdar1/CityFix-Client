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

    return <Navigate state={location.pathname} to='/login'></Navigate>;
};

export default PrivetRoute;