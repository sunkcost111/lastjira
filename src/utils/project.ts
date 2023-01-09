import {useAsync} from "./useAsync";
import {Project} from "../screens/project-list/list";
import {useHttp} from "./http";
import {QueryKey, useMutation, useQuery, useQueryClient} from "react-query";
import {useProjectSeacrhParams} from "../screens/project-list/util";
import {useAddConfig, useDeleteConfig, useEditConfig} from "./use-optimistic-options";

export const useProjects = (param ?: Partial<Project>) => {
  const {run,...result} = useAsync<Project[]>()
  const client = useHttp()
  console.log(param)
  return useQuery<Project[]>(['projects',param],() => client('projects',{data:param}))
}

//自定义hook必须要在最顶层调用
export const useEditProject = (queryKey:QueryKey) => {
  const client = useHttp()
  return useMutation((params:Partial<Project>) => client(`projects/${params.id}`,{
    method:'PATCH',
    data:params
  }),useEditConfig(queryKey))
  // const {run,...asyncResult} = useAsync()
  // const mutate = (params:Partial<Project>) => {
  //   return run(client(`projects/${params.id}`,{
  //     data:params,
  //     method:'PATCH'
  //   }))
  // }
  // return {
  //   mutate,
  //   ...asyncResult
  // }
}

export const useAddProject = (queryKey:QueryKey) => {
  const client = useHttp()
  return useMutation((params:Partial<Project>) => client(`projects`,{
    data:params,
    method:'POST'
  }),useAddConfig(queryKey)
  )
  // const {run,...asyncResult} = useAsync()
  //
  // const mutate = (params:Partial<Project>) => {
  //   return run(client(`projects/${params.id}`,{
  //     data:params,
  //     method:'POST'
  //   }))
  // }
  // return {
  //   mutate,
  //   ...asyncResult
  // }
}

export const useDeleteProject = (queryKey:QueryKey) => {
  const client = useHttp()
  return useMutation((id:number) => client(`projects/${id}`,{
    method:'DELETE'
  }),useDeleteConfig(queryKey))
}

export const useProject = (id?:number) => {
  const client = useHttp()
  return useQuery<Project>(
['project', {id}],
()=>client(`projects/${id}`),
{
    enabled:!!id
  })
}