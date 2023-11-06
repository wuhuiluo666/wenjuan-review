import React from 'react'
import { Typography, Input } from 'antd'
const { TextArea } = Input

export interface ComponentTextAreaProps {
    title?: string
    placeholder?: string
    disabled?: boolean
    onChange?: (data: ComponentTextAreaProps) => void
}

export const defaultProps: ComponentTextAreaProps = {
    title: '文本域标题',
    placeholder: '请输入'
}

export const ComponentTextArea = (props: ComponentTextAreaProps) => {
    const { title, placeholder } = { ...defaultProps, ...props }
    return <div>
        <Typography.Paragraph>{title}</Typography.Paragraph>
        <TextArea placeholder={placeholder}></TextArea>
    </div>
}