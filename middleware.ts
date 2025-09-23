// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/token";
import { getAccessTokenFromRequest } from "@/lib/cookies";

const protectedPaths = ["/account", "/order-history"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedPaths.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isProtected) {
    const token = getAccessTokenFromRequest(req);
    const payload = token ? verifyAccessToken(token) : null;

    if (!payload) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
};
/* export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
}; */

// // ✅ No variable shadowing issues
// const runtimeConfig = {
//   runtime: "nodejs",
// };
// export { runtimeConfig as config };



/* import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/token";


// Define an array of protected routes
const protectedRoutes = ["/order-history", "/account"];


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Check if the route is protected
  if (protectedRoutes.includes(pathname)) {
    const accessToken = req.cookies.get("access-token")?.value;
    const payload = accessToken ? verifyAccessToken(accessToken) : null;

    if (!payload) {
      // If no valid token, redirect to login
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Continue to the next middleware or the page
  return NextResponse.next();
} */


/* export async function middleware(request: NextRequest) {
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
    path.startsWith("/checkout/success") ||  // ✅ allow checkout page
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
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
} */
