import React from "react";
import {Kanban} from "../../types/kanban";
import {useTasks} from "../../utils/task";
import {useTasksSearchParams} from "./util";
import {useTaskTypes} from "../../utils/task-type";
import styled from "@emotion/styled";
import {Card} from 'antd'
import TaskIcon from 'assets/task.svg'
import BugIcon from 'assets/bug.svg'


export const KanbanColumn = ({kanban}:{kanban:Kanban}) => {
  const {data:allTasks} = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id )
  return <Container>
    <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map(task => (<Card style={{marginBottom:'0.5rem'}} key={task.id}>
          {task.name}
          <TaskTypeIcon id={task.typeId}/>
        </Card>))}
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

const Container = styled.div`
  min-width: 27rem;
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