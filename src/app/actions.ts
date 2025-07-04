'use server'

import { signOut as authSignOut } from '@/auth'
import { SIGN_OUT_URL } from '@/settings'
import { redirect } from 'next/navigation'

export async function signOut() {
  await authSignOut({ redirect: false })
  redirect(SIGN_OUT_URL)
}
