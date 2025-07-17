import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    // const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if (!token) {
     return <Navigate to="/login"  replace/>
    }
  try {
    const decoded = jwtDecode(token);
    if(!allowRoles.includes(decoded.role)) {
      return <Navigate to="/login" replace />
    }
    return <Outlet/>
  }
  catch(error) {
    return <Navigate to="/login" replace/>;
  }
};

export default ProtectedRoutes