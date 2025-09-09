import { NextRequest, NextResponse } from "next/server";
import { getTokensFromCookies } from "./lib/cookies";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path.startsWith("/login") ||
    path.startsWith("/signup") ||
    path.startsWith("/forgot-password") ||
    path.startsWith("/reset-password") ||
    path.startsWith("/shop") ||
    path.startsWith("/account") ||
    
    path.startsWith("/product") ||   // ✅ allow product pages
    path.startsWith("/cart") ||      // ✅ allow cart page
    path.startsWith("/checkout") ||  // ✅ allow checkout page
    path.startsWith("/contact") ||  // ✅ allow checkout page
    path.startsWith("/faq") ||  // ✅ allow checkout page

    path.startsWith("/terms") ||  // ✅ allow checkout page
    
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.includes(".") || // skip static files
    path === "/404"; // let 404 page be handled
  const tokens = await getTokensFromCookies();
  const isAuthenticated = !!tokens;

  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    isAuthenticated &&
    (path.startsWith("/login") ||
      path.startsWith("/signup") ||
      path.startsWith("/forgot-password"))
  ) {
    return NextResponse.redirect(new URL("/bookkeeping", request.url));
  }

  if (path.startsWith("/bookkeeping") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/bookkeeping-setup") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/tax-organizer") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
