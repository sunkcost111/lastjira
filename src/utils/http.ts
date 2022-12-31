import qs from "qs"
import * as Auth from 'auth-provider'

//封装我们的异步请求，主要是对token进行持久化
const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?:string,
  data:object
}
export const http = (endpoint:string,{data,token,headers,...customConfig}:Config) => {
  const config = {
    method:'GET',
    headers:{
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    //customConfig可以覆盖前面的参数
    ...customConfig
  }
  if(config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  }else {
    config.body = JSON.stringify(data || {})
  }
  return fetch(`${apiUrl}/${endpoint}`,config)
          .then(async response => {
            if(response.status === 401){
                await Auth.logout()
                window.location.reload()
                return Promise.reject("请重新登录")
            }
            const  data = await response.json()
            if(response.ok){
              return data
            }else{
              //想想fetch和axios对错误的区别
              //只有网络连接断开，fetch才会帮我们抛出错误
              return Promise.reject(data)
            }
          })
}