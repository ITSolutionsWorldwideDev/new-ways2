// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getAccessTokenFromRequest,
  getRoleFromRequest,
  getB2BModeFromRequest,
} from "@/lib/cookies";
import { languages, defaultLocale } from "./lib/i18n-config";

const protectedPaths = ["/account", "/order-history"];
// const protectedPaths = ["/account", "/order-history", "/checkout", "/cart"];
const b2bPaths = ["/b2b", "/wholesale" /* other B2B-only paths */];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  for (const locale of languages) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return handleAuth(req);
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

function handleAuth(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  const segments = pathname.split("/");
  const locale = segments[1];
  const subpath = `/${segments.slice(2).join("/")}`;

  const isProtected = protectedPaths.some(
    (path) => subpath === path || subpath.startsWith(`${path}/`)
  );

  const isB2bOnly = b2bPaths.some(
    (path) => subpath === path || subpath.startsWith(`${path}/`)
  );

  if (isProtected || isB2bOnly) {
    const token = getAccessTokenFromRequest(req);

    /* if (!token || token === "undefined") {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = `/${locale}/login`;
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    } */

    if (!token) {
      url.pathname = `/${locale}/login`;
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    const role = getRoleFromRequest(req);  // e.g. "customer" | "b2b" or null
    const isB2bMode = getB2BModeFromRequest(req);  // boolean from cookie

    // If B2B mode is active, allow only B2B users
    if (isB2bMode && role !== "b2b") {
      // redirect or block
      url.pathname = `/${locale}/not-authorized`;
      return NextResponse.redirect(url);
    }

    /* const payload = token ? verifyAccessToken(token) : null;
    
    if (!payload) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = `/${locale}/login`;
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    } */
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
