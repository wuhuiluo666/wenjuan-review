import { Checkbox, Space, Typography } from 'antd'
import React from 'react'

interface itemType {
    text: string
    value: string
    checked: boolean
}

export interface ComponentCheckBoxProps {
    title?: string
    isVertical?: string
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
        <Typography>{title}</Typography>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
            {
                options?.map((item: any) => {
                    const { text, value, checked } = item
                    return <Checkbox key={value} checked={checked} value={value}>{text}</Checkbox>
                })
            }
        </Space>
    </div>
}