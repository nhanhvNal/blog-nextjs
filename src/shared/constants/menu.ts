import { ROUTE_PATHS } from ".";

export const MENU_ITEMS = [
  {
    title: "Dashboard",
    link: ROUTE_PATHS.HOME,
    auth: true,
  },
  {
    title: "Blank",
    link: ROUTE_PATHS.BLANK,
    auth: true,
  },
  {
    title: "Login",
    link: ROUTE_PATHS.LOGIN,
    auth: "guest",
    hidden: true,
  },
  {
    title: "Not Found",
    link: ROUTE_PATHS.NOT_FOUND,
    hidden: true,
  },
  {
    title: "Forbidden",
    link: ROUTE_PATHS.FORBIDDEN,
    hidden: true,
  },
];
