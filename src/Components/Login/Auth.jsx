import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const Auth = () => {
    const { token } = useContext(AuthContext);
    if (token) {
        return <Outlet />;
    } else {
        return <Navigate to="/auth/login" />;
    }
};

export default Auth;
