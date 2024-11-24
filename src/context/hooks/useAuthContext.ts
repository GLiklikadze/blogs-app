import { createContext, useContext } from "react";

export type AuthContextType = {
  userId: string | undefined;
  handleSetUserId: (id: string | undefined) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("You must Auth inside Context");
  }
  return context;
};
