import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({children }) => {
    const token = localStorage.getItem('token');
     if (token) {
        try {
            const decoded = jwtDecode(token);
            const role = decoded.role;
            if (role === 'admin') {
                return <Navigate to="/adminDashboard" replace/>
            } else if(role === 'customer') {
                return <Navigate to="/homePage" replace />
            }
        }
        catch(error) {
            return children;
        }
     }
    return children;
}

export default PublicRoutes;