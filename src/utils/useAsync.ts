import {useCallback, useReducer, useState} from "react";
import {useMountedRef} from "./index";

interface State <D>{
  error:Error | null,
  data: D | null,
  stat: 'idle' | 'loading' | 'error' | 'success'
}
const defaultState:State<null> = {
  stat:'idle',
  data:null,
  error:null
}
const defaultConfig = {
  throwOnError:false
}
export const useAsync = <D>(initialState?:State<D>,initialConfig?:typeof defaultConfig) => {
  const config = {...defaultConfig,...initialConfig}
  const [state,dispatch] = useReducer((state:State<D>,action:Partial<State<D>>) => ({...state,...action}),{
    ...defaultState,
    ...initialState
  })
  const safeDispatch = useSafeDispatch(dispatch)
  //useState惰性初始化
  const [reTry,setReTry] = useState(() => () => {})
  const setData = useCallback((data:D) => safeDispatch({
    data,
    stat:'success',
    error:null
  }),[safeDispatch])
  const setError = useCallback((error:Error) => safeDispatch({
    error,
    stat:'error',
    data:null
  }),[safeDispatch])
  //run用来触发异步请求
  const run = useCallback((promise:Promise<D>,runConfig?:{reTry:() => Promise<D>}) => {
    if(!promise || !promise.then){
      throw new Error('请传入Promise类型数据')
    }
    setReTry(() => () => {
      if(runConfig?.reTry){
        run(runConfig?.reTry(),runConfig)
      }
    })
    safeDispatch({stat:'loading'})
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      //catch会自己消化异常
      setError(error)
      if(config.throwOnError){ return Promise.reject(error)}
      return error
    })
  },[config.throwOnError,setData,setError,safeDispatch])
  return {
    isIdle:state.stat === 'idle',
    isLoading:state.stat === 'loading',
    isError:state.stat === 'error',
    isSuccess:state.stat === 'success',
    run,
    setError,
    setData,
    //重新调用run
    reTry,
    ...state
  }
}

const useSafeDispatch = <T>(dispatch:(...args:T[]) => void) => {
  const moutedRef = useMountedRef()

  return useCallback((...args:T[]) => (moutedRef.current ? dispatch(...args) : void 0 ),[dispatch,moutedRef])
}