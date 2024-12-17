import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("Authentication"); // Check for authentication token

  const loginUrl = new URL("/auth/signin", req.url);
  const currentPath = req.nextUrl.pathname; // Current path

  if (!token) {
    // Add the redirect path and warning message as query parameters
    loginUrl.searchParams.set("redirect", currentPath);
    loginUrl.searchParams.set("warning", "Please sign in to access this page.");

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // Allow access if authenticated
}

export const config = {
  matcher: ["/ecommerce/:path*"], // Protected paths
};
