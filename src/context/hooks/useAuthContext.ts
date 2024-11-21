import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!AuthContext) {
    throw new Error("You must Auth inside Context");
  }
  return context;
};
