'use client'

import { CHAT_ENDPOINT } from '@/settings'
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ChatModelAdapter,
} from '@assistant-ui/react'
import { useSession } from 'next-auth/react'
import type { ReactNode } from 'react'

export function MyRuntimeProvider({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const session = useSession()
  const MyModelAdapter: ChatModelAdapter = {
    async run({ messages, abortSignal }) {
      const result = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'X-ID-Token': session.data!.idToken,
          'Content-Type': 'application/json',
          Authorization: session.data!.accessToken,
        },
        body: JSON.stringify({
          messages,
        }),
        signal: abortSignal,
      })
      return await result.json()
    },
  }
  const runtime = useLocalRuntime(MyModelAdapter)

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  )
}
