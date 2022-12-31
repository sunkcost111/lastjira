import React from 'react'
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import * as qs from 'qs'
import {cleanObject, useDebaunce, useMount} from "../../utils";
import {useHttp} from "../../utils/http";
const  apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = ()=>{

  const [users,setUsers] = useState([])
  const [param,setParam] = useState({
    name:'',
    personId:''
  })
  const [list,setList] = useState([])
  const debauncedParam = useDebaunce(param,500)
  const client = useHttp()
  useEffect(()=>{
    client('projects',{data:cleanObject(debauncedParam)}).then(list => setList(list))
  },[debauncedParam])
  useMount(()=>{
    client('users').then(users => setUsers(users))
  })
  return <div>
    <SearchPanel param={param} setParam={setParam} users={users} />
    <List list={list}users={users} />
  </div>
}