import React, {ReactNode} from "react"
import {AuthProvider} from "./auth-context";

//整个项目的Providers
export const AppProviders = ({children}:{children:ReactNode}) => {
  return <AuthProvider>
    {children}
  </AuthProvider>
}