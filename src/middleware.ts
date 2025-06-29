import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { SIGN_IN_URL } from './settings'

export default auth((req) => {
  if (!req.auth) {
    const url = new URL(SIGN_IN_URL, req.nextUrl.origin)
    return Response.redirect(url)
  }

  if (
    req.nextUrl.pathname.startsWith('/api') &&
    !(
      req.nextUrl.pathname === '/api/auth/session' ||
      req.nextUrl.pathname === '/api/auth/callback/cognito'
    )
  ) {
    return NextResponse.rewrite(new URL('/404', req.nextUrl.origin))
  }
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth/session|api/auth/callback/cognito|manifest.webmanifest|web-app-manifest-512x512.png).*)',
  ],
}
