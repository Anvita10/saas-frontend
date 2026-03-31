import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("AuthToken") || null);

  function login(newToken) {
    setToken(newToken);
    localStorage.setItem("AuthToken", newToken);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("AuthToken");
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
