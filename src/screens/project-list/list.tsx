import React from "react"
import {User} from "./search-panel";
import {Button, Dropdown, Menu, Modal, Table} from "antd";
import dayjs from "dayjs";
import {TableProps} from "antd/es/table";
import {Link} from "react-router-dom";
import {Pin} from 'components/pin'
import {useDeleteProject, useEditProject} from "../../utils/project";
import {ButtonNoPadding} from "../../components/lib";
import {useProjectModal, useProjectQueryKey} from "./util";
import {useDeleteConfig} from "../../utils/use-optimistic-options";
//todo 需要把id改为number类型
export interface Project {
  id:number,
  name:string,
  personId:number,
  pin:boolean,
  organization:string,
  created:number
}
interface ListProps extends TableProps<Project>{
  users:User[]
}
export const List = ({users,...props}:ListProps)=>{
  const {open} = useProjectModal()
  const {mutate} = useEditProject(useProjectQueryKey())
  const pinProject = (id:number) =>(pin:boolean) => mutate({id,pin})
  return <Table
    pagination={false}
    columns={[
  {
    title: <Pin checked={true} disabled={true} />,
    render(value,project){
      return <Pin checked={project.pin} onCheckedChange={
        pinProject(project.id)
      } />
    }
  },
  {
   title:'名称',
   sorter: (a,b) => a.name.localeCompare(b.name),
    render(value,project){
     return <Link to={String(project.id)}>{project.name}</Link>
    }
  },
  {
    title:'部门',
    dataIndex:'organization'
  },
  {
    title: '负责人',
    render(value,project){
      return <span>
        {users.find(user => user.id === project.personId)?.name || '未知'}
      </span>
    }
  },
  {
    title: '创建时间',
    render(value,project){
      return <span>
        {project.created? dayjs(project.created).format('YYYY-MM-DD') : '无' }
      </span>
    }
  },
  {
    render(value,project){
      return (<More project={project} />)
    }
  }
  ]}
    {...props}
  />
}

const More = ({project}:{project:Project}) => {
  const {startEdit} = useProjectModal()
  const editProject = (id:number) => () => startEdit(id)
  const {mutate:deleteProject} = useDeleteProject(useProjectQueryKey())
  const confirmDeleteProject = (id:number) => {
    Modal.confirm({
      title:'确定删除这个项目吗？',
      content:'点击确定删除',
      okText:'确定',
      onOk(){
        deleteProject(id)
      }
    })
  }
  return <Dropdown overlay={
    <Menu>
      <Menu.Item key={'edit'} onClick={editProject(project.id)}>
        编辑
      </Menu.Item>
      <Menu.Item key={'delete'} onClick={() => confirmDeleteProject(project.id)}>
        删除
      </Menu.Item>
    </Menu>}>
    <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
  </Dropdown>
}