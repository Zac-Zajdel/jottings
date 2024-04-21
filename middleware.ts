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
}
