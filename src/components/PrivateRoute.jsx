import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, currentRole, requiredRole, ...rest }) => {
  return currentRole === requiredRole ? element : <Navigate to="/" />;
};

export default PrivateRoute;
  