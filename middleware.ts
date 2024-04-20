// import { withAuth } from "next-auth/middleware"
import { auth } from "./auth"
import { NextResponse } from "next/server"

// export { auth as middleware } from "./auth"

export default auth((req) => {
  if (!req.auth) {
    console.log('Not auth revert back')
    return NextResponse.rewrite(new URL('/signin', req.url))
  }

  console.log('got past')
})

// export default auth((req) => {
//     const token = await getToken({ req })
//     const session = auth()
//     const isAuth = !!token
//     const isAuthPage =
//       req.nextUrl.pathname.startsWith("/signin") ||
//       req.nextUrl.pathname.startsWith("/register")

//     if (isAuthPage) {
//       if (isAuth) {
//         return NextResponse.redirect(new URL("/jots", req.url))
//       }

//       return null
//     }

//     if (!isAuth) {
//       let from = req.nextUrl.pathname;
//       if (req.nextUrl.search) {
//         from += req.nextUrl.search;
//       }

//       return NextResponse.redirect(
//         new URL(`/signin?from=${encodeURIComponent(from)}`, req.url)
//       );
//     }
// })

// todo - look into
// {
//   callbacks: {
//     async authorized() {
//       // This is a work-around for handling redirect on auth pages.
//       // We return true here so that the middleware function above
//       // is always called.
//       return true
//     },
//   },
// }

export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/signin", "/register"],
}
