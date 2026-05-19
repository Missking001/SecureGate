import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export async function proxy(request: NextRequest) {
  const session = await auth();

  // Protect /dashboard and all sub-routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session || !session.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session.user.emailVerified === null) {
      return NextResponse.redirect(new URL("/verify-email-notice", request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];
  const isAuthRoute = authRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (isAuthRoute && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/forgot-password", "/reset-password"],
};
