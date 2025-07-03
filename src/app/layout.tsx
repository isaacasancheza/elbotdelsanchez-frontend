import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
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

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <SessionProvider>
      <html lang="es-MX" className="h-full">
        <body className="h-full">
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <MyRuntimeProvider>
              <SidebarInset>
                <SidebarTrigger />
                {children}
              </SidebarInset>
            </MyRuntimeProvider>
          </SidebarProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
