import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true); // If token exists, the user is authenticated
    }
  }, []); // This runs once when the component is mounted

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
