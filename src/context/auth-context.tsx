import React, {createContext, ReactNode, useContext, useState} from "react"
import * as Auth from 'auth-provider'
import {User} from "screens/project-list/search-panel";
import {http} from "../utils/http";
import {useMount} from "../utils";

interface  AuthForm {
  username:string,
  password:string
}
//保持登录状态
const bootstarpUser = async () => {
  let user = null
  const token = Auth.getToken()
  if(token){
    const data = await http('me',{token})
    user = data.user
  }
  return user
}
const AuthContext = createContext<{
    user:User | null,
    login:(form:AuthForm) => Promise<void>,
    register:(form:AuthForm) => Promise<void>,
    logout:() => Promise<void>
  } | undefined>(undefined)

//主要用于显示在“devtools”
AuthContext.displayName = 'AuthContext'

//封装我们的provider
export const AuthProvider = ({children}:{children:ReactNode}) => {
  const [user,setUser] = useState<User | null>(null)

  //point-free风格
  const login = (form:AuthForm) => Auth.login(form).then(user => setUser(user))
  const register = (form:AuthForm) => Auth.register(form).then(user => setUser(user))
  const logout = () => Auth.logout().then(() => setUser(null))
  useMount(()=>{
    bootstarpUser().then(user => setUser(user))
  })

  return <AuthContext.Provider value={{user,login,register,logout}}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context){
    throw new Error("useAuth必须在AuthProvider中使用")
  }
  return context
}
