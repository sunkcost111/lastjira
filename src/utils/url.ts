//使用url管理我们的单页面应用

//返回页面url指定键的参数值
import {useSearchParams} from "react-router-dom";
import {useMemo} from "react";
import {cleanObject} from "./index";
import {URLSearchParamsInit} from "react-router-dom/dist/dom";

//注意这里的泛型使用
export const useUrlQueryParam = <K extends string>(keys:K[]) => {
  const [searchParams,setSearchParams] = useSearchParams()
  //useMemo的效果
  return [
    useMemo( () =>keys.reduce((prev,key) => {
      return {...prev,[key]:searchParams.get(key) || ''}
    },{} as {[key in K]:string}),[searchParams]),
    (params:Partial<{[key in K]:unknown}>) => {
    const o = cleanObject({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const
  //数组的限制 我们用 as const
}