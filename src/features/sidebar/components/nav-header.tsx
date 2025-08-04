'use client'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function NavHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="pointer-events-none">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <span className="text-xs font-bold">E</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="font-semibold">Expenses Tracker</span>
            <span className="text-xs text-muted-foreground">
              Manage your expenses efficiently
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
