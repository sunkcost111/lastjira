import React from "react";
import {useUsers} from 'utils/user'
import {IdSelect} from "./id-select";
import {Select} from "antd";

export const UserSelect = (props:React.ComponentProps<typeof IdSelect>) => {
  const {data:users}  = useUsers()
  console.log('$',props)
  return <IdSelect options={users || []}
    {...props} />
}