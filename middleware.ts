import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.rewrite(new URL('/signin', req.url))
  }

  // If user is authenticated and hitting '/signin' route, redirect them back to main screen.
  if (req.auth && req.url.includes('/signin')) {
    return NextResponse.redirect(new URL('/jots', req.url))
  }
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/jots/:path*",
    "/templates/:path*",
    "/settings/:path*",
    "/signin",
  ],

  /**
   * Temporary fix until Tailwind package is compatible with edge runtime.
   * See: https://github.com/resend/react-email/issues/1105
   */
  unstable_allowDynamic: [
    "**/node_modules/@react-email*/**/*.mjs*",
  ],
}
