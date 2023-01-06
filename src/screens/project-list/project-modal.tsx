import React from "react";
import {Button, Drawer} from "antd";

export const ProjectModal = (props:{projectModalOPen:boolean,onClose:() => void}) => {
  return (
    <Drawer width={'100%'} visible={props.projectModalOPen}>
      <h1>ProjectModal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  )
}