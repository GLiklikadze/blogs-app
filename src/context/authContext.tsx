import { PropsWithChildren, useCallback, useState } from "react";
import { AuthContext } from "./hooks/useAuthContext";
import { User } from "@supabase/supabase-js";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  const handleSetUserId = useCallback((newUser: User | undefined) => {
    setUser(newUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleSetUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
