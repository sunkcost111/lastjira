import {User} from "../screens/project-list/search-panel";
import {useAsync} from "./useAsync";
import {useHttp} from "./http";
import {useQuery} from "react-query";

export const useUsers = (param ?: Partial<User>) => {
  const client = useHttp()
  return useQuery<User[]>(['users',param],() => client('users',{data:param}))
}
