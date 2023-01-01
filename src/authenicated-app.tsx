import React from "react"
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from '@emotion/styled'
import {Form} from "antd";
export const AuthenicatedApp = () => {
  const {logout} = useAuth()
  return <Container>
    <Header>
      <HeaderLeft>
        <h3>logo</h3>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight><button onClick={logout}>登出</button></HeaderRight>
    </Header>
    <Nav>Nav</Nav>
    <Main>
      <ProjectListScreen/>
    </Main>
    <Aside>Aside</Aside>
    <Footer>Footer</Footer>
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
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas: 
  "header header header"
  "nav main aside"
  "footer footer footer"
  ;
  height: 100vh;
  grid-gap: 10rem;
`

const Main = styled.div`
  grid-area: main;
`
//grid-area是给子元素起名字
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div`

`
const Nav = styled.nav`
  grid-area: nav;
`
const Aside = styled.aside`
  grid-area: aside;
`
const Footer = styled.footer`
  grid-area: footer;
`