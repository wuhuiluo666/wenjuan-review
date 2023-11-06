import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ComponentInfoProps } from '.'

const { TextArea } = Input

export const InfoProps = (props: ComponentInfoProps) => {
    const { title, desc, onChange, disabled } = props
    useEffect(() => {
        form.setFieldsValue({ title, desc })
    }, [title, desc])
    const valuesChange = () => {
        onChange && onChange(form.getFieldsValue())
    }
    const [form] = useForm()
    return <Form disabled={disabled} onChange={valuesChange} initialValues={{ title, desc }} layout={'vertical'} form={form}>
        <Form.Item name={'title'} label={'问卷标题'} rules={[{ required: true, message: '请输入问卷标题' }]}>
            <Input />
        </Form.Item>
        <Form.Item name={'desc'} label={"问卷描述"}>
            <TextArea style={{ height: '150px' }} />
        </Form.Item>
    </Form>
}