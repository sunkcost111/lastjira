import {Project} from "../screens/project-list/list";
import {useAsync} from "./useAsync";
import {useHttp} from "./http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {Task} from "../types/task";
import {Kanban} from "../types/kanban";
import {useAddConfig, useDeleteConfig, useEditConfig} from "./use-optimistic-options";

export const useTasks = (param ?: Partial<Task>) => {
  const {run,...result} = useAsync<Project[]>()
  const client = useHttp()
  return useQuery<Task[]>(['tasks',param],() =>
    client('tasks',{data:param}))
}

export const useAddTask = (queryKey:QueryKey) => {
  const client = useHttp()
  return useMutation((params:Partial<Task>) => client(`tasks`,{
      data:params,
      method:'POST'
    }),useAddConfig(queryKey)
  )
}
export const useTask = (id?:number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['task', {id}],
    ()=>client(`tasks/${id}`),
    {
      enabled:!!id
    })
}
export const useEditTask = (queryKey:QueryKey) => {
  const client = useHttp()
  return useMutation((params:Partial<Task>) => client(`tasks/${params.id}`,{
    method:'PATCH',
    data:params
  }),useEditConfig(queryKey))
}
export const useDeleteTask = (queryKey:QueryKey) => {
  const client = useHttp()
  return useMutation((id:number) => client(`tasks/${id}`,{
    method:'DELETE'
  }),useDeleteConfig(queryKey))
}