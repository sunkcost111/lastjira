import {useAsync} from "./useAsync";
import {Project} from "../screens/project-list/list";
import {cleanObject, useDebaunce} from "./index";
import {useHttp} from "./http";
import {useEffect} from "react";

export const useProjects = (param ?: Partial<Project>) => {
  const {run,...result} = useAsync<Project[]>()
  const fetchProjects = () => client('projects',{data:cleanObject(param || {})})

  const client = useHttp()
  useEffect(()=>{
    run(fetchProjects(),{
      reTry:fetchProjects
    })
  },[param])
  return result
}

//自定义hook必须要在最顶层调用
export const useEditProject = () => {
  const {run,...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params:Partial<Project>) => {
    return run(client(`projects/${params.id}`,{
      data:params,
      method:'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const {run,...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params:Partial<Project>) => {
    return run(client(`projects/${params.id}`,{
      data:params,
      method:'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}