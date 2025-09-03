// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login: accepts full user object
  const login = (userData) => {
    const newUser = { isAuthenticated: true, ...userData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // SignUp: similar to login, ensures consistent shape
  const signUp = (userData) => {
    const newUser = { isAuthenticated: true, ...userData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Logout: clears user state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
