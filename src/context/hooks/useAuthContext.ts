import { createContext, useContext } from "react";
import { AuthContextType } from "./authContext.types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("You must Auth inside Context");
  }
  return context;
};
