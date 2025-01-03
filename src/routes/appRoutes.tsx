import AuthLayout from "@/components/layout/AuthLayout";
import AuthGuard from "@/components/route-guards/authGuard";
import { Route, Routes } from "react-router-dom";
import { AUTH_ROUTES } from "./auth/authRoutes";
import { AUTH_PATHS } from "./auth/authPaths.enum";
import Layout from "@/components/layout/Layout";
import { CONTENT_ROUTES } from "./content/contenRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={AUTH_PATHS.AUTH}
        element={
          <AuthGuard>
            <AuthLayout />
          </AuthGuard>
        }
      >
        {AUTH_ROUTES}
      </Route>
      <Route element={<Layout />}>{CONTENT_ROUTES}</Route>
    </Routes>
  );
};

export default AppRoutes;
