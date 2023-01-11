import {Project} from "../screens/project-list/list";
import {useAsync} from "./useAsync";
import {useHttp} from "./http";
import {useQuery} from "react-query";
import {Task} from "../types/task";

export const useTasks = (param ?: Partial<Task>) => {
  const {run,...result} = useAsync<Project[]>()
  const client = useHttp()
  return useQuery<Task[]>(['tasks',param],() =>
    client('tasks',{data:param}))
}