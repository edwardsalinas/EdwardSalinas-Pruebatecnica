import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      const isPublicRoute = isOnLogin ||
        nextUrl.pathname.startsWith("/404") ||
        nextUrl.pathname.startsWith("/technical");

      if (isPublicRoute) return true;

      if (!isLoggedIn) return false;

      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL("/menu", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
