import React from 'react';
import Routes from './src/Routes';
import { AuthProvider } from './src/Routes/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
