import { Suspense } from "react";
import { Route } from "react-router-dom";
import { LazyLoginPage, LazyRegisterPage } from "./authLazyExport";
import { AUTH_PATHS } from "./authPaths.enum";

export const AUTH_ROUTES = [
  <Route
    key={AUTH_PATHS.LOGIN}
    path={AUTH_PATHS.LOGIN}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <LazyLoginPage />
      </Suspense>
    }
  />,
  <Route
    key={AUTH_PATHS.REGISTER}
    path={AUTH_PATHS.REGISTER}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <LazyRegisterPage />
      </Suspense>
    }
  />,
];
