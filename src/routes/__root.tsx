import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

import type { QueryClient } from '@tanstack/react-query'
import type { AuthContextType } from '@/features/auth/AuthContext.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'

interface MyRouterContext {
  queryClient: QueryClient
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />

      <Toaster />
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </>
  ),
})
