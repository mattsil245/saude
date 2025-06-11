import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarUsuario = async () => {
      try {
        const user = await AsyncStorage.getItem('usuario');
        setUsuario(user ? JSON.parse(user) : null);
      } catch (e) {
        console.log('Erro ao verificar usuário:', e);
      } finally {
        setLoading(false);
      }
    };

    verificarUsuario();
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
