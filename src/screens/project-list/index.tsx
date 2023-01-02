import React from 'react'
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import * as qs from 'qs'
import {cleanObject, useDebaunce, useMount} from "../../utils";
import {useHttp} from "../../utils/http";
import styled from "@emotion/styled";
import {Typography} from 'antd'
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
const  apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = ()=>{

  const [param,setParam] = useState({
    name:'',
    personId:''
  })
  const debauncedParam = useDebaunce(param,500)
  const {isLoading,error,data:list} = useProjects(debauncedParam)
  const {data:users} = useUsers()

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel param={param} setParam={setParam} users={users || [] } />
    {
      error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null
    }
    <List dataSource={list || []} users={users || [] } loading={isLoading} />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`