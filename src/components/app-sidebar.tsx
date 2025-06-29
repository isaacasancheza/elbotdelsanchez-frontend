'use client'

import * as React from 'react'

import Logo from '@/app/icon1.svg'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession()
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    unoptimized
                    src={Logo}
                    alt="Logotipo"
                    className="size-8"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    El Bot del Sánchez
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            email: session.data?.profile.email as string,
            avatar: session.data?.profile.picture as string,
            givenName: session.data?.profile.given_name as string,
            familyName: session.data?.profile.family_name as string,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
