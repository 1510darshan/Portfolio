import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if localStorage is available (not available during SSR/build)
  const token = typeof window !== 'undefined' && window.localStorage 
    ? localStorage.getItem('adminToken') 
    : null;
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export default PrivateRoute;
