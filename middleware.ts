import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.rewrite(new URL('/signin', req.url))
  }
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/jots/:path*",
    "/templates/:path*",
    "/settings/:path*",
  ],
  // Temporary fix until Tailwind package is compatible with edge runtime
  // See: https://github.com/resend/react-email/issues/1105
  unstable_allowDynamic: [
    "**/node_modules/@react-email*/**/*.mjs*",
  ],
}
