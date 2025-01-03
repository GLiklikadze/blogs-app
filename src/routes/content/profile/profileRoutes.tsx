import { Suspense } from "react";
import { Route } from "react-router-dom";
import { CONTENT_PATHS } from "../contentPaths.enum";
import { LazyProfilePage } from "../contentLazyExports";

export const PROFILE_ROUTE = [
  <Route
    key={CONTENT_PATHS.PROFILE}
    path={`/${CONTENT_PATHS.PROFILE}`}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <LazyProfilePage />
      </Suspense>
    }
  />,
];
