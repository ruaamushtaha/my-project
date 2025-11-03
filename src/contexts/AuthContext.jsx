import React, { createContext, useState, useEffect } from "react";

// 1. Create context
export const AuthContext = createContext();

// 2. Create provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);

  // Load auth from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (savedToken && savedRole) {
      setToken(savedToken);
      setUserRole(savedRole);
      setIsAuthenticated(true);
    } else if (process.env.NODE_ENV === 'development') {
      // Auto-login for development mode as parent
      const devToken = 'dev-token-123';
      const devRole = 'parent';
      localStorage.setItem("token", devToken);
      localStorage.setItem("role", devRole);
      setToken(devToken);
      setUserRole(devRole);
      setIsAuthenticated(true);
      console.log('🔧 Development mode: Auto-logged in as parent');
    }
  }, []);

  // Login function
  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setToken(token);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
