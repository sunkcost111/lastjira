import React from "react";
import {useTasksSearchParams} from "./util";
import {useSetUrlSearchParam} from "../../utils/url";
import {Row} from "../../components/lib";
import {Button, Input} from "antd";
import {UserSelect} from "../../components/user-select";
import {TaskTypeSelect} from "../../components/task-type-select";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams()
  const setSearchParam = useSetUrlSearchParam()
  const reset = () => {
    setSearchParam({
      typeId:undefined,
      processorId:undefined,
      tagId: undefined,
      name:undefined
    })
  }
  return <Row gap={true} marginBottom={4}>
    <Input
      style={{width:'20rem'}}
      placeholder={'任务名'}
      value={searchParams.name}
      onChange={evt => {setSearchParam({name:evt.target.value}
      )}}/>
    <UserSelect
      defaultOptionName={'经办人'}
      value={searchParams.processorId}
      onChange={value => {setSearchParam({processorId:value})}}/>
    <TaskTypeSelect defaultOptionName={'类型'} value={searchParams.typeId}
                    onChange={value => setSearchParam({typeId:value})} />

    <Button onClick={reset}>清除筛选器</Button>
  </Row>
}