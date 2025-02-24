import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth.service";

interface IRoleBaseRoute {
  Reader: RegExp[];
  Author: RegExp[];
  Admin: RegExp[];
  Moderator: RegExp[];
  SuperAdmin: RegExp[];
}

const roleBaseRoutes: IRoleBaseRoute = {
  Reader: [/^\/dashboard\/reader/, /^\/post/],
  Author: [/^\/dashboard\/author/, /^\/post/],
  Admin: [/^\/dashboard\/staff/, /^\/post/],
  Moderator: [/^\/dashboard\/staff/, /^\/post/],
  SuperAdmin: [/^\/dashboard\/staff/, /^\/post/],
};

const authRoutes = ["/login", "/signup"];

export default async function (request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  if (user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(`/login/?redirect=${pathname}`, request.url));
    }
  } else if (user?.role && roleBaseRoutes[user.role]) {
    const routes = roleBaseRoutes[user.role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}
export const config = {
  matcher: ["/dashboard/:page*", "/login", "/signup"],
};
