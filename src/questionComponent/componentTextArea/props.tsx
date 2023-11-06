import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ComponentTextAreaProps } from '.'

export const TextAreaProps = (props: ComponentTextAreaProps) => {
    const { title, placeholder, onChange, disabled } = props
    const [form] = useForm()
    useEffect(() => {
        form.setFieldsValue({ title, placeholder })
    }, [title, placeholder])
    const valuesChange = () => {
        onChange && onChange(form.getFieldsValue())
    }
    return <Form disabled={disabled} onChange={valuesChange} initialValues={{ title, placeholder }} layout={'vertical'} form={form}>
        <Form.Item name={'title'} label={'文本域标题'} rules={[{ required: true, message: '请输入文本域标题' }]}>
            <Input />
        </Form.Item>
        <Form.Item name={'placeholder'} label={'Placeholder'}>
            <Input />
        </Form.Item>
    </Form>
}