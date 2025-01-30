import { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  return <AuthContext.Provider value={{ token, login }}>{children}</AuthContext.Provider>;
};
