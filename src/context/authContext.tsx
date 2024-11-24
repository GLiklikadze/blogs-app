import { PropsWithChildren, useState } from "react";
import { AuthContext } from "./hooks/useAuthContext";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userId, setUserId] = useState<string | undefined>();

  const handleSetUserId = (id: string | undefined) => {
    setUserId(id);
  };
  return (
    <AuthContext.Provider value={{ userId, handleSetUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
