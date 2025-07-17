import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if (!token) {
     
    }
  return (
    <div>ProtectedRoutes</div>
  )
}

export default ProtectedRoutes