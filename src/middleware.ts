import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  if (!req.auth) {
    const url = new URL('/iniciar-sesion', req.nextUrl.origin)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|web-app-manifest-512x512.png|api/auth/callback/cognito|iniciar-sesion).*)',
  ],
}
