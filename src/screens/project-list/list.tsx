import React from "react"
import {User} from "./search-panel";
import {Button, Dropdown, Menu, Table} from "antd";
import dayjs from "dayjs";
import {TableProps} from "antd/es/table";
import {Link} from "react-router-dom";
import {Pin} from 'components/pin'
import {useEditProject} from "../../utils/project";
import {ButtonNoPadding} from "../../components/lib";
import {useDispatch} from "react-redux";
import {projectListActions} from "./project-list.slice";
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
  users:User[],
  refresh?:() => void
}
export const List = ({users,...props}:ListProps)=>{
  const dispatch = useDispatch()
  const {mutate} = useEditProject()
  const pinProject = (id:number) =>(pin:boolean) => mutate({id,pin}).then(props.refresh)
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
      return <Dropdown overlay={<Menu>
        <Menu.Item key={'edit'}>
          <ButtonNoPadding
          type={'link'}
          onClick={() => dispatch(projectListActions.openProjectModal())}
          >
          编辑
          </ButtonNoPadding>
        </Menu.Item>
      </Menu>}>
        <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
      </Dropdown>
    }
  }
  ]}
    {...props}
  />
}