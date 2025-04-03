export enum ErrorCode {
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  NOT_FOUND: "/404",
  FORBIDDEN: "/403",
  INTERNAL_SERVER_ERROR: "/500",
  BLANK: "/blank",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/forgot-password/reset",
};

export enum ThemeMode {
  DARK = "dark",
  LIGHT = "light",
}
