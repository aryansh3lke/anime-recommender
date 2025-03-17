export const NEXT_PUBLIC_DOMAIN: string =
  process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

export const FLASK_BACKEND_PROXY: string =
  process.env.NEXT_PUBLIC_FLASK_BACKEND_PROXY || "http://localhost:8000";

export const SIGNIN_ERROR_URL: string = "/signin-error";
