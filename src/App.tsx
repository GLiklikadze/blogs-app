import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./components/header/components/theme/theme-provider";

const LazyHomePage = lazy(() => import("./pages/homePage/HomePage"));
const LazyWritePage = lazy(() => import("./pages/write/WritePage"));
const LazyAboutPage = lazy(() => import("./pages/about/AboutPage"));
const LazyLoginPage = lazy(() => import("./pages/login/LoginPage"));
const LazyRegisterPage = lazy(() => import("./pages/register/RegisterPage"));
const LazyAuthorPage = lazy(() => import("./pages/author/AuthorPage"));

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyHomePage />
                </Suspense>
              }
            />
            <Route
              path="/write"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyWritePage />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyAboutPage />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyLoginPage />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyRegisterPage />
                </Suspense>
              }
            />
            <Route
              path="/author"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyAuthorPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
