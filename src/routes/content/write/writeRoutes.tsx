import { Suspense } from "react";
import { Route } from "react-router-dom";
import { LazyWritePage } from "../contentLazyExports";
import { CONTENT_PATHS } from "../contentPaths.enum";

export const WRITE_ROUTE = [
  <Route
    key={CONTENT_PATHS.WRITE}
    path={`/${CONTENT_PATHS.WRITE}`}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <LazyWritePage />
      </Suspense>
    }
  />,
];
