import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return isAdmin ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
