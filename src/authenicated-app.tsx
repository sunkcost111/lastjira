import React from "react"
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from '@emotion/styled'
import {Row} from "components/lib";
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import {Dropdown,Menu} from "antd";
export const AuthenicatedApp = () => {
  const {logout,user} = useAuth()
  // @ts-ignore
  // @ts-ignore
  return <Container>
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <a onClick={e => e.preventDefault()}>
          hi,{user?.name}
        </a>
      </HeaderRight>
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