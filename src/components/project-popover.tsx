import React from "react";
import {Button, Divider, List, Popover, Typography} from "antd";
import {useProjects} from "../utils/project";
import styled from "@emotion/styled";
import {ButtonNoPadding} from "./lib";
import {useProjectModal} from "../screens/project-list/util";

export const ProjectPopover =() => {
  const {open} = useProjectModal()
  const {data:projects,refetch} = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin)
  const content = <ContentContainer>
    <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project => <List.Item>
          <List.Item.Meta title={project.name} />
        </List.Item>)
      }
    </List>
    <Divider/>
    <ButtonNoPadding
    type={'link'}
    onClick={open}
    >
      编辑
    </ButtonNoPadding>
  </ContentContainer>
  return <Popover placement={'bottom'} content={content} onVisibleChange={() => refetch()}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`