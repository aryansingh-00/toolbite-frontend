import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useClientAuth } from '../../contexts/ClientAuthContext';

const ClientProtectedRoute = () => {
  const { clientUser, loading } = useClientAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Enforce redirection if no session is active.
  return clientUser ? <Outlet /> : <Navigate to="/client-login" replace />;
};

export default ClientProtectedRoute;
