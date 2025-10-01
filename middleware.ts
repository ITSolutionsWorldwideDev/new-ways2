// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromRequest } from "@/lib/cookies";
import { languages, defaultLocale } from "./lib/i18n-config";

const protectedPaths = ["/account", "/order-history"];

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
  const { pathname } = req.nextUrl;

  const segments = pathname.split("/");
  const locale = segments[1];
  const subpath = `/${segments.slice(2).join("/")}`;

  const isProtected = protectedPaths.some(
    (path) => subpath === path || subpath.startsWith(`${path}/`)
  );

  if (isProtected) {
    const token = getAccessTokenFromRequest(req);

    if (!token || token === "undefined") {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = `/${locale}/login`;
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
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
