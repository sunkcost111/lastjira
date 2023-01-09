import {useAsync} from "./useAsync";
import {Project} from "../screens/project-list/list";
import {useHttp} from "./http";
import {useMutation, useQuery, useQueryClient} from "react-query";

export const useProjects = (param ?: Partial<Project>) => {
  const {run,...result} = useAsync<Project[]>()
  const client = useHttp()
  console.log(param)
  return useQuery<Project[]>(['projects',param],() => client('projects',{data:param}))
}

//自定义hook必须要在最顶层调用
export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation((params:Partial<Project>) => client(`projects/${params.id}`,{
    method:'PATCH',
    data:params
  }),{
    onSuccess:() => queryClient.invalidateQueries('projects')
  })
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

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation((params:Partial<Project>) => client(`projects`,{
    data:params,
    method:'POST'
  }),{
    //刷新缓存
    onSuccess:() => queryClient.invalidateQueries('projects')
  })
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

export const useProject = (id?:number) => {
  const client = useHttp()
  return useQuery<Project>(
['project', {id}],
()=>client(`projects/${id}`),
{
    enabled:!!id
  })
}