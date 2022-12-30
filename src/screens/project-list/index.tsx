import React from 'react'
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import * as qs from 'qs'
import {cleanObject, useDebaunce, useMount} from "../../utils";
const  apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = ()=>{

  const [users,setUsers] = useState([])
  const [param,setParam] = useState({
    name:'',
    personId:''
  })
  const [list,setList] = useState([])
  const debauncedParam = useDebaunce(param,2000)
  useEffect(()=>{
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debauncedParam))}`).then(
      async response => {
        if (response.ok){
          setList(await response.json())
        }
      })
  },[debauncedParam])
  useMount(()=>{
    fetch(`${apiUrl}/users`).then(
      async response => {
        if (response.ok){
          setUsers(await response.json())
        }
      })
  })
  return <div>
    <SearchPanel param={param} setParam={setParam} users={users} />
    <List list={list}users={users} />
  </div>
}