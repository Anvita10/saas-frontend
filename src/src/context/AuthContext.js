import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("AuthToken") || null);
  const [user, setUser] = useState(localStorage.getItem("username" || null));

  function login(newToken, userName) {
    setToken(newToken);
    setUser(userName);
    localStorage.setItem("AuthToken", newToken);
    localStorage.setItem("username", userName);
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("username");
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
