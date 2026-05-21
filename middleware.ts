import { auth } from "@/lib/auth";

const PUBLIC_PATHS = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/api/auth",
];

const isPublicPath = (pathname: string) =>
  PUBLIC_PATHS.some((p) => pathname.startsWith(p));

const isStaticAsset = (pathname: string) =>
  pathname.startsWith("/_next") ||
  pathname === "/favicon.ico" ||
  pathname.startsWith("/images/") ||
  pathname.startsWith("/fonts/");

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;

  // Never block static assets
  if (isStaticAsset(pathname)) return;

  // Public auth pages — redirect logged-in verified users to dashboard
  if (isPublicPath(pathname)) {
    if (
      isLoggedIn &&
      req.auth?.user?.emailVerified &&
      pathname !== "/verify-email"
    ) {
      return Response.redirect(new URL("/dashboard", req.url));
    }
    return;
  }

  // Not logged in → redirect to login with callbackUrl
  if (!isLoggedIn) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return Response.redirect(url);
  }

  // Logged in but email not verified → restrict dashboard access
  if (pathname.startsWith("/dashboard") && !req.auth?.user?.emailVerified) {
    return Response.redirect(new URL("/verify-email-notice", req.url));
  }

  // Logged in, verified — but hitting verify-email-notice? Send them to dashboard.
  if (
    pathname === "/verify-email-notice" &&
    req.auth?.user?.emailVerified
  ) {
    return Response.redirect(new URL("/dashboard", req.url));
  }
});
