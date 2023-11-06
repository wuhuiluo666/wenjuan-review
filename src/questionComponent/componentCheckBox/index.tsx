import React from 'react'
import { Checkbox, Space, Typography } from 'antd'

interface itemType {
    text: string
    value: string
    checked?: boolean
}

export interface ComponentCheckBoxProps {
    title?: string
    isVertical?: boolean
    disabled?: boolean
    options?: itemType[]
    onChange?: (data: ComponentCheckBoxProps) => void
}

const options = [
    {
        text: '选项1',
        value: 'item1',
        checked: false
    },
    {
        text: '选项2',
        value: 'item2',
        checked: false
    },
    {
        text: '选项3',
        value: 'item3',
        checked: false
    }
]

export const defaultProps = {
    title: '复选框标题',
    isVertical: false,
    options,
}


export const ComponentCheckBox = (props: ComponentCheckBoxProps) => {
    const { title, isVertical, options } = { ...defaultProps, ...props }
    return <div>
        <Typography.Paragraph>{title}</Typography.Paragraph>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
            {
                options?.map((item: any) => {
                    const { key, text, value, checked } = item
                    return <Checkbox checked={checked} key={key} value={value}>{text}</Checkbox>
                })
            }
        </Space>
    </div>
}