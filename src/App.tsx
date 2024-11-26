import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./components/header/components/theme/theme-provider";
import { supabase } from "./supabase/supabaseClient";
import { useAuthContext } from "./context/hooks/useAuthContext";
import AuthGuard from "./components/route-guards/authGuard";
import ProfilePage from "./pages/profile/ProfilePage";

const LazyHomePage = lazy(() => import("./pages/homePage/HomePage"));
const LazyWritePage = lazy(() => import("./pages/write/WritePage"));
const LazyAboutPage = lazy(() => import("./pages/about/AboutPage"));
const LazyLoginPage = lazy(() => import("./pages/login/LoginPage"));
const LazyRegisterPage = lazy(() => import("./pages/register/RegisterPage"));
const LazyAuthorPage = lazy(() => import("./pages/author/AuthorPage"));

function App() {
  const { handleSetUserId } = useAuthContext();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSetUserId(session?.user);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSetUserId(session?.user);
    });

    return () => subscription.unsubscribe();
  }, [handleSetUserId]);

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
                  <AuthGuard>
                    <LazyLoginPage />
                  </AuthGuard>
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AuthGuard>
                    <LazyRegisterPage />
                  </AuthGuard>
                </Suspense>
              }
            />
            <Route
              path="/author/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyAuthorPage />
                </Suspense>
              }
            />
            <Route
              path="profile"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProfilePage />
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
