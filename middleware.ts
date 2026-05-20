import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { defaultLocale, isLocale, stripLocaleFromPath, withLocalePath } from "@/lib/locale";

const localeCookieName = "NEXT_LOCALE";
const PUBLIC_FILE = /\.(.*)$/;

function detectLocale(request: NextRequest) {
  const pathLocale = request.nextUrl.pathname.split("/")[1];

  if (pathLocale === "en") {
    return pathLocale;
  }

  return defaultLocale;
}

export default withAuth(
  function middleware(request) {
    const pathname = request.nextUrl.pathname;

    // Never run locale/auth rewriting for framework internals or static files.
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname === "/favicon.ico" ||
      pathname === "/robots.txt" ||
      pathname === "/sitemap.xml" ||
      PUBLIC_FILE.test(pathname)
    ) {
      return NextResponse.next();
    }

    const locale = detectLocale(request);
    const pathLocale = pathname.split("/")[1];
    const pathnameWithoutLocale = stripLocaleFromPath(pathname);
    const token = request.nextauth.token;

    if (pathLocale === "ar") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = pathnameWithoutLocale;
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.set(localeCookieName, defaultLocale, {
        path: "/",
        sameSite: "lax",
      });
      return response;
    }

    if (!token && pathnameWithoutLocale.match(/^\/dashboard/)) {
      const signinUrl = request.nextUrl.clone();
      signinUrl.pathname = withLocalePath(locale, "/signin");
      return NextResponse.redirect(signinUrl);
    }

    if (token && pathnameWithoutLocale.match(/^\/signin/)) {
      const role = token?.role;
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = withLocalePath(locale, `/dashboard/${role}`);
      return NextResponse.redirect(dashboardUrl);
    }

    if (isLocale(pathLocale)) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = pathnameWithoutLocale;

      const response = NextResponse.rewrite(rewriteUrl);
      response.cookies.set(localeCookieName, locale, {
        path: "/",
        sameSite: "lax",
      });
      return response;
    }

    const response = NextResponse.next();
    response.cookies.set(localeCookieName, locale, {
      path: "/",
      sameSite: "lax",
    });
    return response;
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};
