
import React from 'react';
import { Navigate } from 'react-router-dom';

// The Index page now just redirects to the root, which is handled by UniverseHome
export default function Index() {
  return <Navigate to="/" replace />;
}
