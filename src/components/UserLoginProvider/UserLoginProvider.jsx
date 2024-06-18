import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const UserLoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState([]);
  return <LoginContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>{children}</LoginContext.Provider>;
};
