import {useState} from "react";

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
  const [state,setState] = useState<State<D>>({
    ...defaultState,
    ...initialState
  })
  //useState惰性初始化
  const [reTry,setReTry] = useState(() => () => {})
  const setData = (data:D) => setState({
    data,
    stat:'success',
    error:null
  })
  const setError = (error:Error) => setState({
    error,
    stat:'error',
    data:null
  })
  //run用来触发异步请求
  const run = (promise:Promise<D>,runConfig?:{reTry:() => Promise<D>}) => {
    if(!promise || !promise.then){
      throw new Error('请传入Promise类型数据')
    }
    setReTry(() => () => {
      if(runConfig?.reTry){
        run(runConfig?.reTry(),runConfig)
      }
    })
    setState({
      ...state,
      stat:'loading'
    })
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      //catch会自己消化异常
      setError(error)
      if(config.throwOnError){ return Promise.reject(error)}
      return error
    })
  }
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