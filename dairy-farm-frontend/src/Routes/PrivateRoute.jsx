import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { accessToken } = useAuth();

  if (accessToken == "") {
    alert('Please login to continue');
    console.log(accessToken)
    // Redirect to the login page
    return <Navigate to="/login" />;
  } else {
    // Show an alert or any other user feedback
    console.log(accessToken)
    return <>{children}</>;
  }
};

export default PrivateRoute;
