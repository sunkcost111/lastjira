import React, {useState} from "react"
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from '@emotion/styled'
import {ButtonNoPadding, Row} from "components/lib";
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import {Button, Dropdown, Menu} from "antd";
import { Route, Routes} from 'react-router'
import {BrowserRouter,Navigate} from 'react-router-dom'
import {ProjectScreen} from 'screens/project/index'
import {resetRoute} from 'utils/index'
import {ProjectModal} from "./screens/project-list/project-modal";
import {ProjectPopover} from "./components/project-popover";
export const AuthenicatedApp = () => {
  // @ts-ignore
  return <Container>
    <BrowserRouter>
      <PageHeader/>
      <Main>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />}/>
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>}/>
            <Route path={'/'} element={<Navigate to={'/projects'} />} />
          </Routes>
      </Main>
      <ProjectModal/>
    </BrowserRouter>
  </Container>
}

const PageHeader = () => {
  const {logout,user} = useAuth()
  return <Header between={true}>
    <HeaderLeft gap={true}>
      <ButtonNoPadding type={'link'} onClick={resetRoute}>
        <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
      </ButtonNoPadding>
      <ProjectPopover />
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
      <a onClick={logout}>
        hi,{user?.name}
      </a>
    </HeaderRight>
  </Header>
}
//flex和grid很多功能可以互相使用
//grid和flex的引用场景
//1 一维布局用flex 二维布局用Grid
//2 ？？内容出发:先有内容，数量不固定 希望他们均匀分布容器大小，根据内容大小自己适应占据的空间
// 内容出发:flex
// ?? 布局出发 先规划网格 再把内容往里面填充
//布局出发:Grid
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
const Main = styled.div`
  display: flex;
  overflow: hidden;
`
//grid-area是给子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div`
`