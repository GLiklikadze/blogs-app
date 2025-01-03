import { AUTHOR_ROUTE } from "../author/authorRoutes";
import { ABOUT_ROUTE } from "./about/aboutRoutes";
import { MAIN_ROUTE } from "./main/mainRoutes";
import { PROFILE_ROUTE } from "./profile/profileRoutes";
import { WRITE_ROUTE } from "./write/writeRoutes";

export const CONTENT_ROUTES = [
  ...MAIN_ROUTE,
  ...WRITE_ROUTE,
  ...ABOUT_ROUTE,
  ...AUTHOR_ROUTE,
  ...PROFILE_ROUTE,
];
