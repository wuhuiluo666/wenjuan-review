import React from 'react'
import { Typography } from 'antd'

export interface ComponentParagraph {
    text?: string
    isCenter?: boolean
    disabled?: boolean
    onChange?: (data: ComponentParagraph) => void
}

export const defaultProps: ComponentParagraph = {
    text: '段落内容',
    isCenter: false
}

export const ComponentParagraph = (props: ComponentParagraph) => {
    const { text, isCenter } = { ...defaultProps, ...props }
    return <Typography.Paragraph style={{ margin: 0, textAlign: isCenter ? 'center' : 'start' }}>
        {
            text?.split('\n').map((text, index) => (
                <span key={text}>
                    {index > 0 && <br />}
                    {text}
                </span>
            ))
        }
    </Typography.Paragraph>
}