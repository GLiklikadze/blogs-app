import { PropsWithChildren, useState } from "react";
import { AuthContext } from "./hooks/useAuthContext";
import { User } from "@supabase/supabase-js";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  const handleSetUserId = (user: User | undefined) => {
    setUser(user);
  };
  return (
    <AuthContext.Provider value={{ user, handleSetUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
