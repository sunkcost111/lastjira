import React from "react";
import {Button, Divider, List, Popover, Typography} from "antd";
import {useProjects} from "../utils/project";
import styled from "@emotion/styled";
import {ButtonNoPadding} from "./lib";
import {useProjectModal} from "../screens/project-list/util";
import {useUsers} from "../utils/user";

export const UserPopover =() => {
  const {data:users,refetch} = useUsers()
  const content = <ContentContainer>
    <Typography.Text type={'secondary'}>组员列表</Typography.Text>
    <List>
      {
        users?.map(user => <List.Item>
          <List.Item.Meta title={user.name} />
        </List.Item>)
      }
    </List>
    <Divider/>
  </ContentContainer>
  return <Popover placement={'bottom'} content={content} onVisibleChange={() => refetch()}>
    <span>组员</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`