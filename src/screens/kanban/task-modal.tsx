import React, {useEffect} from "react";
import {useForm} from "antd/es/form/Form";
import {useTaskModal, useTasksQueryKey} from "./util";
import {useDeleteTask, useEditTask} from "../../utils/task";
import {Button, Form, Input, Modal} from "antd";
import {UserSelect} from "../../components/user-select";
import {TaskTypeSelect} from "../../components/task-type-select";
const layout = {
  labelCol:{span:8},
  wrapperCol:{span:16}
}
export const TaskModal =() => {
  const [form] = useForm()
  const {editingTask,editingTaskId,close} = useTaskModal()
  const {mutateAsync:editTask,isLoading:editLoading} = useEditTask(useTasksQueryKey())
  const {mutate:deleteTask} = useDeleteTask(useTasksQueryKey())
  const onCancel = () => {
    close()
    form.resetFields()
  }
  const onOk = async () => {
    await editTask({...editingTask,...form.getFieldsValue()})
    close()
  }
  const startDelete = () => {
    close()
    Modal.confirm({
      okText:'确定',
      cancelText:'取消',
      title:'确定取消任务吗？',
      onOk(){
        return deleteTask(Number(editingTaskId))
      }
    })
  }
  useEffect(()=>{
    form.setFieldsValue(editingTask)
  },[form,editingTask])

  return <Modal
    forceRender={true}
    onCancel={onCancel}
    onOk={onOk}
    okText={'确认'}
    cancelText={'取消'}
    confirmLoading={editLoading}
    title={'编辑任务'}
    visible={!!editingTaskId}
  >
    <Form initialValues={editingTask} form={form} {...layout}>
      <Form.Item label={'任务名'} name={'name'} rules={[{required:true,message:'请输入任务名'}]}>
        <Input/>
      </Form.Item>
      <Form.Item label={'经办人'} name={'processorId'} >
        <UserSelect defaultOptionName={'经办人'} />
      </Form.Item>
      <Form.Item label={'类型'} name={'typeId'} >
        <TaskTypeSelect/>
      </Form.Item>
    </Form>
    <div style={{textAlign:'right'}}>
      <Button onClick={startDelete} style={{fontSize:'14px'}} size={'small'}>删除</Button>
    </div>
  </Modal>
}