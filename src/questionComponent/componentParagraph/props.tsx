import React, { useEffect } from 'react'
import { ComponentParagraph } from '.'
import { useForm } from 'antd/es/form/Form'
import { Checkbox, Form, Input } from 'antd'

const { TextArea } = Input

export const ParagraphProps = (props: ComponentParagraph) => {
    const [form] = useForm()
    const { text, isCenter, onChange, disabled } = props
    useEffect(() => {
        form.setFieldsValue({ text, isCenter })
    }, [text, isCenter])
    const valuesChange = () => {
        onChange && onChange(form.getFieldsValue())
    }
    return <Form disabled={disabled} onChange={valuesChange} layout={'vertical'} form={form} initialValues={{ text, isCenter }}>
        <Form.Item label={'段落内容'} name={'text'} rules={[{ required: true, message: '请输入段落内容' }]}>
            <TextArea style={{ height: '150px' }}></TextArea>
        </Form.Item>
        <Form.Item name={'isCenter'} valuePropName={'checked'}>
            <Checkbox>是否居中</Checkbox>
        </Form.Item>
    </Form>
}