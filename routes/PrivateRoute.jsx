import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ allowedRoles, redirectPath = '/login' }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, but save the current location they were trying to go to
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check if user has any of the allowed roles
  const hasRequiredRole = allowedRoles.includes(userRole);

  if (!hasRequiredRole) {
    // User is authenticated but doesn't have the required role
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // If authenticated and has required role, render the child routes
  return <Outlet />;
};

export default PrivateRoute;
