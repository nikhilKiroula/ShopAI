import { createContext, useContext, useEffect, useState } from "react";

import {
  getProfile,
  logoutUser,
} from "../services/auth.service.js";

const AuthContext = createContext();

const USER_KEY = "shopai-user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(USER_KEY);

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Check logged-in user when app starts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getProfile();

        const currentUser = response.data;

        setUser(currentUser);

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(currentUser)
        );
      } catch (error) {
        setUser(null);
        localStorage.removeItem(USER_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = (userData) => {
    setUser(userData);

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(userData)
    );
  };

  // Logout
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem(USER_KEY);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);