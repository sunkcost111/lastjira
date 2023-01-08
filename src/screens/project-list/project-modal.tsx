import React from "react";
import {Button, Drawer} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {projectListActions, selectProjectModalOpen} from "./project-list.slice";

export const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModalOPen = useSelector(selectProjectModalOpen)
  return (
    <Drawer
      width={'100%'}
      visible={projectModalOPen}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h1>ProjectModal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
  )
}