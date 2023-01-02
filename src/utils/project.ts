import {useAsync} from "./useAsync";
import {Project} from "../screens/project-list/list";
import {cleanObject, useDebaunce} from "./index";
import {useHttp} from "./http";
import {useEffect} from "react";

export const useProjects = (param ?: Partial<Project>) => {
  const {run,...result} = useAsync<Project[]>()

  const client = useHttp()
  useEffect(()=>{
    run(client('projects',{data:cleanObject(param || {})}))
  },[param])
  return result
}