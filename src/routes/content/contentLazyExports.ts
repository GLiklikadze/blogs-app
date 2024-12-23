import { lazy } from "react";

export const LazyHomePage = lazy(() => import("@/pages/homePage/HomePage"));
export const LazyWritePage = lazy(() => import("@/pages/write/WritePage"));
export const LazyAboutPage = lazy(() => import("@/pages/about/AboutPage"));
export const LazyAuthorPage = lazy(() => import("@/pages/author/AuthorPage"));
export const LazyProfilePage = lazy(
  () => import("@/pages/profile/ProfilePage"),
);
