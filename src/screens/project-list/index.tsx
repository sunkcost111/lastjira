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
import {useProjectModal, useProjectSeacrhParams} from "./util";
import {ButtonNoPadding, ErrorBox, Row} from "../../components/lib";

export const ProjectListScreen = ()=>{
  useDocumentTitle('项目列表',false)

  const {open} = useProjectModal()
  //基本类型和组件状态维护的高级数据类型可以放在依赖里
  const [param,setParam] = useProjectSeacrhParams()
  const {isLoading,error,data:list} = useProjects(useDebaunce(param,500))
  const {data:users} = useUsers()

  return <Container>
    <Row between={true}>
      <h1>项目列表</h1>
      <ButtonNoPadding
      type={'link'}
      onClick={open}
      >
        创建
      </ButtonNoPadding>
    </Row>
    <SearchPanel param={param} setParam={setParam} users={users || [] } />
    <ErrorBox error={error}/>
    <List
      dataSource={list || []}
      users={users || [] }
      loading={isLoading}/>
  </Container>
}
ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`