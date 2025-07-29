import NextAuth, { Profile } from 'next-auth'
import Cognito from 'next-auth/providers/cognito'
import {
  AUTH_COGNITO_ID,
  AUTH_COGNITO_ISSUER,
  AUTH_COGNITO_SECRET,
  SIGN_OUT_URL,
} from './settings'

declare module 'next-auth' {
  interface Session {
    groups: string[]
    idToken: string
    profile: Profile
    expiresAt: number
    accessToken: string
    refreshToken: string
  }
}

export const cognito = Cognito({
  checks: ['state'],
  issuer: AUTH_COGNITO_ISSUER,
  clientId: AUTH_COGNITO_ID,
  clientSecret: AUTH_COGNITO_SECRET,
  authorization: {
    params: {
      lang: 'es',
    },
  },
})

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [cognito],
  callbacks: {
    async authorized({ auth }) {
      return !!auth
    },
    async session({ token, session }) {
      if (token) {
        session.idToken = token.idToken as string
        session.profile = token.profile as Profile
        session.accessToken = token.accessToken as string
        session.refreshToken = token.refreshToken as string
        session.groups = (session.profile['cognito:groups'] as string[]) ?? []
      }
      return session
    },
    async jwt({ token, profile, account }) {
      // sign in
      if (account) {
        token.profile = profile
        token.idToken = account.id_token
        token.expiresAt = Date.now() + (account.expires_in ?? 3600) * 1000
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }

      // check if token is still valid
      else if (Date.now() < (token.expiresAt as number)) {
        return token
      }

      // token expired, refresh token
      else {
        const url = new URL(SIGN_OUT_URL)
        try {
          const response = await fetch(url.origin + `/oauth2/token`, {
            method: 'POST',
            headers: {
              Authorization: `Basic ${btoa(
                `${AUTH_COGNITO_ID}:${AUTH_COGNITO_SECRET}`,
              )}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            cache: 'no-cache',
            credentials: 'include',
            body: new URLSearchParams({
              client_id: AUTH_COGNITO_ID,
              client_secret: AUTH_COGNITO_SECRET,
              grant_type: 'refresh_token',
              refresh_token: token!.refreshToken as string,
            }),
          })

          const jwt = await response.json()

          // failed to refresh token, re-login
          if (!response.ok) {
            token.error = 'RefreshAccessTokenError'
            return token
          }

          return {
            ...token,
            idToken: jwt.id_token,
            accessToken: jwt.access_token,
            expiresAt: Date.now() + jwt.expires_in * 1000,
            // refresh token rotation
            refreshToken: jwt.refresh_token ?? token.refreshToken,
          }
        } catch (err) {
          console.error('Failed to refresh token:', err)
          token.error = 'RefreshAccessTokenError'
          return token
        }
      }
      return token
    },
  },
})
