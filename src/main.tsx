import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { LoaderIcon } from 'lucide-react'
import * as TanStackQueryProvider from '@/integrations/tanstack-query/root-provider.tsx'

// Import the generated route tree
import { routeTree } from '@/routeTree.gen'
import reportWebVitals from '@/reportWebVitals.ts'

import { AuthProvider, useAuth } from '@/features/auth/AuthContext.tsx'

import '@/styles.css'

// Create a new router instance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
    auth: undefined!,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function Router() {
  const auth = useAuth()
  if (!auth.isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderIcon className="animate-spin" />
      </div>
    )
  }

  return <RouterProvider router={router} context={{ auth }} />
}

function App() {
  return (
    <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </TanStackQueryProvider.Provider>
  )
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
