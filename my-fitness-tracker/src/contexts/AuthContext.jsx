// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedAuth = localStorage.getItem('user');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  const login = (username) => {
    const newUser = { isAuthenticated: true, username };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signUp = (userData) => {
    const newUser = { isAuthenticated: true, ...userData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
