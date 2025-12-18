import React from 'react';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from '../pages/Loading/Loading';
import { Navigate } from 'react-router';

const CitizenPrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: profile = {}, isLoading } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
        enabled: !!user?.email
    });


    if (loading || isLoading) {
        return <Loading />;
    }

    if ((user && user.role === 'citizen') || profile.role === 'citizen') {
        return children;
    }

    return <Navigate to='/' />;
};

export default CitizenPrivateRoute;
