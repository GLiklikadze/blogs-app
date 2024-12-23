import { Suspense } from "react";
import { Route } from "react-router-dom";
import { CONTENT_PATHS } from "../content/contentPaths.enum";
import { LazyAuthorPage } from "../content/contentLazyExports";

export const AUTHOR_ROUTE = [
  <Route
    key={CONTENT_PATHS.AUTHOR}
    path={`/${CONTENT_PATHS.AUTHOR}`}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAuthorPage />
      </Suspense>
    }
  />,
];
