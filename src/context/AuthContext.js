import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("AuthToken");
    const storedUser = localStorage.getItem("username");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(storedUser);

    setLoading(false);
  }, []);

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
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
