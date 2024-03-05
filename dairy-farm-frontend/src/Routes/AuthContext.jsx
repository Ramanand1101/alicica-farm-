// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    // Initialize accessToken from localStorage or an empty string if not found
    return localStorage.getItem('access_token') || '';
  });

  const setToken = (token) => {
    localStorage.setItem('access_token', token);
    console.log(token)
    setAccessToken(token);
  };


  return (
    <AuthContext.Provider value={{ accessToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
