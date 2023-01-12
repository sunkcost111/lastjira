import React from "react";
import {Kanban} from "../../types/kanban";
import {useTasks} from "../../utils/task";
import {useKanbansQueryKey, useTaskModal, useTasksSearchParams} from "./util";
import {useTaskTypes} from "../../utils/task-type";
import styled from "@emotion/styled";
import {Button, Card, Dropdown, Menu, Modal} from 'antd'
import {CreateTask} from "./create-task";
import {Task} from "../../types/task";
import {Mark} from "../../components/mark";
import {useUrlQueryParam} from "../../utils/url";
import {useDeleteKanban} from "../../utils/kanban";
import {Row} from "../../components/lib";

const TaskCard = ({task}:{task:Task}) => {
  const {startEdit} = useTaskModal()
  const {name:keyWord} = useTasksSearchParams()
  return <Card onClick={() => startEdit(task.id)} style={{marginBottom:'0.5rem',cursor:'pointer'}} key={task.id}>
    <Mark name={task.name} keyWord={keyWord}/>
    <TaskTypeIcon id={task.typeId}/>
  </Card>
}
const More = ({kanban}:{kanban:Kanban}) => {
  const {mutateAsync} = useDeleteKanban(useKanbansQueryKey())
  const startEdit = () => {
    Modal.confirm({
      okText:'确定',
      cancelText:'取消',
      title:'确定删除看板吗？',
      onOk(){
        return  mutateAsync(kanban.id)
      }
    })
  }
  const overlay = <Menu>
    <Menu.Item>
      <Button onClick={startEdit} type={'link'}>删除</Button>
    </Menu.Item>
  </Menu>
  return <Dropdown overlay={overlay}>
    <Button type={'link'}>...</Button>
  </Dropdown>
}

export const KanbanColumn = ({kanban}:{kanban:Kanban}) => {
  const {data:allTasks} = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id )
  return <Container>
    <Row between={true}>
      <h3>{kanban.name}</h3>
      <More kanban={kanban}/>
    </Row>
    <TasksContainer>
      {tasks?.map(task => <TaskCard task={task}/>)}
      <CreateTask kanbanId={kanban.id}/>
    </TasksContainer>
  </Container>
}

const TaskTypeIcon = ({id}:{id:number}) => {
  const {data:taskTypes} = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if(!name) {return null}
  return <div>
    {name === 'task' ? <div>task</div> : <div>bug</div> }
  </div>
}


export const Container = styled.div`
  min-width: 20rem;
  border-radius: 6px;
  background-color: rgb(244,245,277);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`
const TasksContainer = styled.div`
  overflow: scroll;
  flex:1;
  ::-webkit-scrollbar {
    display: none;
  }
`