import { Suspense } from "react";
import { Route } from "react-router-dom";
import { LazyHomePage } from "../contentLazyExports";

export const MAIN_ROUTE = [
  <Route
    path="/"
    key="/"
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <LazyHomePage />
      </Suspense>
    }
  />,
];
