import React, { useEffect } from 'react'
import { Checkbox, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ComponentTitleProps } from '.'

const options = [
    { value: 1, text: 1 },
    { value: 2, text: 2 },
    { value: 3, text: 3 }
]

export const TitleProps = (props: ComponentTitleProps) => {
    const { text, level, isCenter, onChange } = props
    const [form] = useForm()
    useEffect(() => {
        form.setFieldsValue({ text, level, isCenter })
    }, [text, level, isCenter])
    const valuesChange = () => {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }
    return <Form onChange={valuesChange} initialValues={{ text, level, isCenter }} form={form} layout={'vertical'} >
        <Form.Item label={'标题内容'} name={'text'} rules={[{ required: true, message: '请输入标题内容' }]}>
            <Input />
        </Form.Item>
        <Form.Item label={'字体等级'} name={'level'}>
            <Select options={options}>
            </Select>
        </Form.Item>
        <Form.Item name={'isCenter'} valuePropName={'checked'}>
            <Checkbox>是否居中</Checkbox>
        </Form.Item>
    </Form>
}