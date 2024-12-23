import { Suspense } from "react";
import { Route } from "react-router-dom";
import { LazyAboutPage } from "../contentLazyExports";
import { CONTENT_PATHS } from "../contentPaths.enum";

export const ABOUT_ROUTE = [
  <Route
    key={CONTENT_PATHS.ABOUT}
    path={`/${CONTENT_PATHS.ABOUT}`}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAboutPage />
      </Suspense>
    }
  />,
];
