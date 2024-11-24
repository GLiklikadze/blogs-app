import { useAuthContext } from "@/context/hooks/useAuthContext";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthContext();
  if (user) {
    return <Navigate to="/" />;
  }

  return children || <Outlet />;
};

export default AuthGuard;
