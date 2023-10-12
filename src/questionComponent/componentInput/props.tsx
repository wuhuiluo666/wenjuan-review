import React, { useEffect } from 'react'
import { ComponentInputProps } from '.'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'

export const InputProps = (props: ComponentInputProps) => {
    const { title, placeholder, onChange } = props
    const [form] = useForm()
    // 点击时改变属性变化
    useEffect(() => {
        form.setFieldsValue({ title, placeholder })
    }, [title, placeholder])
    // 改变组件属性
    const valuesChange = () => {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }
    return <Form onValuesChange={valuesChange} initialValues={{ title, placeholder }} form={form} layout={'vertical'} >
        <Form.Item label={'输入框组件标题'} name={'title'} rules={[{ required: true, message: '请输入标题' }]}>
            <Input />
        </Form.Item>
        <Form.Item label={'Placeholder'} name={'placeholder'}>
            <Input />
        </Form.Item>
    </Form>
}