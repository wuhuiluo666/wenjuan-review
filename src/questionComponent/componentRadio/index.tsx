import React from 'react'
import { Radio, Space, Typography } from 'antd'

interface optionType {
    text: string
    value: string
}

export interface ComponentRadioProps {
    title?: string
    isVertical?: boolean
    options?: optionType[]
    value?: string
    onChange?: (data: ComponentRadioProps) => void
}

const options: optionType[] = [
    { text: '选项1', value: '1' },
    { text: '选项2', value: '2' },
    { text: '选项3', value: '3' }
]

export const defaultProps: ComponentRadioProps = {
    title: '单选框标题',
    isVertical: false,
    options,
    value: 'item1'
}

export const ComponentRadio = (props: ComponentRadioProps) => {
    const { title, isVertical, options, value } = { ...defaultProps, ...props }
    return <div>
        <Typography.Paragraph>{title}</Typography.Paragraph>
        <Radio.Group value={value}>
            <Space direction={isVertical ? 'vertical' : 'horizontal'}>
                {
                    options?.map(item => {
                        const { text, value } = item
                        return <Radio key={value} value={value}>
                            {text}
                        </Radio>
                    })
                }
            </Space>
        </Radio.Group>
    </div>
}