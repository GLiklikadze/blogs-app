import { PropsWithChildren, useState } from "react";
import { AuthContext } from "./hooks/useAuthContext";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleSetUser = (user: any) => {
    setUser(user);
  };
  return (
    <AuthContext.Provider value={{ user, handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};
