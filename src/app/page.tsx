'use client'

import { Thread } from '@/components/assistant-ui/thread'
import { SessionProvider } from 'next-auth/react'

export default function Page() {
  return (
    <SessionProvider>
      <Thread />
    </SessionProvider>
  )
}
