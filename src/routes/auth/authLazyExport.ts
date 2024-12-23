import { lazy } from "react";

export const LazyLoginPage = lazy(() => import("@/pages/login/LoginPage"));
export const LazyRegisterPage = lazy(
  () => import("@/pages/register/RegisterPage"),
);
