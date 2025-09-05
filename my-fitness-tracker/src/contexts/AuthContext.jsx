// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save or update user in users array
  const saveToUsers = (newUser) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const exists = storedUsers.find((u) => u.email === newUser.email);

    let updatedUsers;
    if (exists) {
      updatedUsers = storedUsers.map((u) =>
        u.email === newUser.email ? newUser : u
      );
    } else {
      updatedUsers = [...storedUsers, newUser];
    }

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const login = (userData) => {
    const newUser = { isAuthenticated: true, ...userData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    saveToUsers(newUser); // ✅ keep users list updated
  };

  const signUp = (userData) => {
    const newUser = { isAuthenticated: true, ...userData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    saveToUsers(newUser); // ✅ ensure new signup is stored
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const deleteAccount = () => {
  if (!user) return;

  // Remove from users array
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const updatedUsers = storedUsers.filter((u) => u.email !== user.email);
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Clear current user
  setUser(null);
  localStorage.removeItem("user");
};


  return (
    <AuthContext.Provider value={{ user, login, logout, signUp, deleteAccount}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
