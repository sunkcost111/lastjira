import {useEffect, useState} from "react"

const isFalsy = (value:unknown) => (value === 0 ? false : !value);
//在一个函数不能修改原对象
export const cleanObject = (object:object) => {
  const result = JSON.parse(JSON.stringify(object));
  Object.keys(result).forEach((key) => {
    const value = result[key];
    //当value为0时，会被误删除
    if (isFalsy(value)) {
      delete result[key];
    }
  })
  return result
}
//进行初始化页面useEffect依赖为空数组的自定义hook
export const useMount = (callback:() => void)=>{
  useEffect(()=>{
    callback()
  },[])
}

//原始防抖原生函数
const debaunce = (func:() => void,delay?:number) => {
  let timeout:any
  return () => {
    if(timeout){
      clearTimeout(timeout)
    }
    timeout = setTimeout(()=>{
      func()
    },delay)
  }
}

//custom hook是因为我们需要使用其他的hook（个人见解）
export const useDebaunce = <V>(value:V,delay?:number ) => {
  //使用useState是因为我们需要react检测到value的变化
  const [debauncedValue,setDebauncedValue] = useState(value)
  //每次在value变化以后设置一个定时器
  useEffect(()=>{
    const timeout = setTimeout(()=> setDebauncedValue(value),delay)
    //上次useEffect执行之后运行return函数
    return ()=>clearTimeout(timeout)
  },[value,delay])
  return debauncedValue
}
