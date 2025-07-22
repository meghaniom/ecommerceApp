import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (!allowedRoles.includes(userRole)) {
   
      if (userRole === 'admin') {
        return <Navigate to="/adminDashboard" replace />;
      } else {
        return <Navigate to="/homePage" replace />;
      }
    }

   
    return <Outlet />;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;
