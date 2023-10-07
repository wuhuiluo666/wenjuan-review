import React from 'react'
import { Input, Typography } from 'antd'


export interface ComponentInputProps {
    title?: string
    placeholder?: string
}

export const defaultProps: ComponentInputProps = {
    title: '输入框标题',
    placeholder: '请输入'
}

export const ComponentInput = (props: ComponentInputProps) => {
    const { title, placeholder } = { ...defaultProps, ...props }
    return <div>
        <Typography.Paragraph>{title}</Typography.Paragraph>
        <div>
            <Input placeholder={placeholder} />
        </div>
    </div>
}