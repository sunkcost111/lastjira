import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {Routes, Route, Navigate, useLocation} from 'react-router';
import {KanbanScreen} from "../kanban";
import {EpicScreen} from "../epic";
import styled from "@emotion/styled";
import {Menu} from "antd";

const useRouteTypes = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length-1]
}
export const ProjectScreen = () => {
  const routeType = useRouteTypes()
  return <Container>
    <Aside>
      <Menu mode={'inline'} selectedKeys={[routeType]}>
        <Menu.Item key={'kanban'}>
          <Link to={'kanban'}>看板</Link>
        </Menu.Item>
        <Menu.Item key={'epic'}>
          <Link to={'epic'}>任务组</Link>
        </Menu.Item>
      </Menu>
    </Aside>
    <Main>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen/>} />
        <Route path={'/epic'} element={<EpicScreen/>} />
        <Route  path={''} element={<Navigate replace={true} to={'kanban'}/> } />
      </Routes>
    </Main>
  </Container>
}

const Aside = styled.aside`
  background-color: rgb(244,245,247);
  display: flex;
`
const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0,0,0,.1);
  display: flex;
  overflow: hidden;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
  width: 100%;
`