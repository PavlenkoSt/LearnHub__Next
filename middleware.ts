import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async (req: NextRequest) => {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    const isAuthFlow =
      req.nextUrl.pathname.startsWith("/sign-in") ||
      req.nextUrl.pathname.startsWith("/sign-up");

    if (isAuthFlow && isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/sign-in",
    },
  },
);

export const config = {
  matcher: ["/", "/dashboard", "/dashboard/:path*"],
};
