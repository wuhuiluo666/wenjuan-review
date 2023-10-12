import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

export interface ComponentTitleProps {
    text?: string
    level?: 1 | 2 | 3
    isCenter?: boolean
    onChange?: (data: ComponentTitleProps) => void
}

export const defaultProps: ComponentTitleProps = {
    text: '默认标题',
    level: 1,
    isCenter: false
}

export const ComponentTitle = (props: ComponentTitleProps) => {
    const { text, level = 1, isCenter } = { ...defaultProps, ...props }
    const genFontSize = (level: number) => {
        if (level === 1) return '20px'
        if (level === 2) return '24px'
        return '16px'
    }
    return <Title style={{ margin: 0, textAlign: isCenter ? 'center' : 'start', fontSize: genFontSize(level) }}>
        {text}
    </Title>
}