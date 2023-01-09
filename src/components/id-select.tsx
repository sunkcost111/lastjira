//解决select的value id问题，我们（服务器）设置option的value的值为number,但是select获取的却自动变为string
import React from "react";
import {Raw} from "../types";
import {Select} from "antd";

type SelectProps = React.ComponentProps<typeof Select>
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'defaultOptionName' | 'options'> {
  value?:Raw | null | undefined,
  //值往外传的时候就必须为number
  onChange?:(value?:number) => void,
  defaultOptionName?: string,
  options?: {name:string,id:number}[]
}
//我们期待 value可以传入多种类型的值
//onChange只会回调number | undefined 的值
//当isNaN(value)为true的时候代表选择默认类型
//当选择默认类型，onChange会回调undefined

export const IdSelect = (props:IdSelectProps) => {
  const {value,onChange,defaultOptionName,options,...restProps} = props
  return <Select
    value={options?.length ? toNumber(value) : 0}
    onChange={value => onChange?.(toNumber(value) || undefined)}
    {...restProps}
  >
    {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
    {
      options?.map(option => <Select.Option value={option.id} key={option.id}>
        {option.name}
      </Select.Option>)
    }
  </Select>
}

const toNumber = (value:unknown) => isNaN(Number(value)) ? 0 : Number(value)