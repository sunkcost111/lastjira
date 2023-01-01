import React from "react"
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from '@emotion/styled'
import {Row} from "components/lib";
export const AuthenicatedApp = () => {
  const {logout} = useAuth()
  return <Container>
    <Header between={true}>
      <HeaderLeft gap={true}>
        <h2>logo</h2>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight><button onClick={logout}>登出</button></HeaderRight>
    </Header>
    <Main>
      <ProjectListScreen/>
    </Main>
  </Container>
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
`
//grid-area是给子元素起名字
const Header = styled(Row)`
`
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div`
`