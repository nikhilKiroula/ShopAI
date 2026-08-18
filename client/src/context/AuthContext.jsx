import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const USER_KEY = "shopai-user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(USER_KEY);

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const login = (userData) => {
    setUser(userData);

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(userData),
    );
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);