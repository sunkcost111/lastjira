import React, {ReactNode} from "react"
import {AuthProvider} from "./auth-context";
import {QueryClientProvider,QueryClient} from 'react-query'

//整个项目的Providers
export const AppProviders = ({children}:{children:ReactNode}) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  )
}