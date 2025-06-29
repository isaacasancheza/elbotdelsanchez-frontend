import NextAuth, { Profile } from 'next-auth'
import Cognito from 'next-auth/providers/cognito'

declare module 'next-auth' {
  interface Session {
    profile: Profile
    idToken: string
    accessToken: string
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Cognito({
      checks: ['none'],
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account }) {
      if (profile) {
        token.profile = profile
      }
      if (account) {
        token.idToken = account.id_token
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ token, session }) {
      if (token) {
        session.profile = token.profile as Profile
        session.idToken = token.idToken as string
        session.accessToken = token.accessToken as string
      }
      return session
    },
    async authorized({ auth }) {
      return !!auth
    },
  },
})
