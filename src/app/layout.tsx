import { MyRuntimeProvider } from '@/providers/assistant-ui-provider'
import '@/styles/global.css'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'El Bot del Sánchez',
  description: 'Pregunta lo que sea y sorpréndete con las respuestas.',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <SessionProvider>
      <MyRuntimeProvider>
        <html lang="es-MX" className="h-full">
          <body className="h-full">
            <main className="h-full">{children}</main>
          </body>
        </html>
      </MyRuntimeProvider>
    </SessionProvider>
  )
}
