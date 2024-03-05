import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = ({ children }) => {
  const { accessToken } = useAuth();
  const userRole = localStorage.getItem('user_role');

  if (userRole !== 'admin') {
    alert('Access denied. You do not have the required permissions.');
      console.log(userRole);
      return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};

export default AdminRoute;
