'use client'
import Link from 'next/link'
import Image from 'next/image'
import { BotIcon, Calendar, Home, Inbox, Search, Settings, StarIcon, VideoIcon } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { AppUserButton } from './app-user-button'

// Menu items.
const firstSection = [
  {
    label: 'Meetings',
    icon: VideoIcon,
    href: '/mettings',
  },
  {
    label: 'Agents',
    icon: BotIcon,
    href: '/agents',
  },
]

const secondSection = [
  {
    label: 'Upgrage',
    icon: StarIcon,
    href: '/upgrade',
  },
]

export const DashboardSidebar = () => {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image src="/next.svg" height={48} width={48} alt="Meet.AI" />
          <p className="text-xl">Meet.AI</p>
        </Link>
      </SidebarHeader>
      <div></div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      pathname === item.href &&
                        'bg-sidebar-accent text-sidebar-primary hover:text-sidebar-primary font-bold'
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      pathname === item.href &&
                        'bg-sidebar-accent text-sidebar-primary hover:text-sidebar-primary font-bold'
                    )}
                  >
                    <a href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AppUserButton />
      </SidebarFooter>
    </Sidebar>
  )
}
