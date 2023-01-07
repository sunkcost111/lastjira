import React from 'react'
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useDebaunce, useDocumentTitle, useMount} from "../../utils";
import styled from "@emotion/styled";
import {Button, Typography} from 'antd'
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {useUrlQueryParam} from "../../utils/url";
import {useProjectSeacrhParams} from "./util";
import {Row} from "../../components/lib";

export const ProjectListScreen = (props:{projectButton:JSX.Element})=>{
  useDocumentTitle('项目列表',false)

  //基本类型和组件状态维护的高级数据类型可以放在依赖里
  const [param,setParam] = useProjectSeacrhParams()
  const {isLoading,error,data:list,reTry} = useProjects(useDebaunce(param,500))
  const {data:users} = useUsers()

  return <Container>
    <Row between={true}>
      <h1>项目列表</h1>
      {props.projectButton}
    </Row>
    <SearchPanel param={param} setParam={setParam} users={users || [] } />
    {
      error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null
    }
    <List
      refresh={reTry}
      dataSource={list || []}
      users={users || [] }
      loading={isLoading}
      projectButton={props.projectButton} />
  </Container>
}
ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`