import React from 'react'
import { Typography } from 'antd'

export interface ComponentInfoProps {
    title?: string
    desc?: string
    onChange?: (data: ComponentInfoProps) => void
}

export const defaultProps: ComponentInfoProps = {
    title: '问卷标题',
    desc: '问卷描述'
}

export const ComponentInfo = (props: ComponentInfoProps) => {
    const { title, desc = '问卷描述' } = { ...defaultProps, ...props }
    return <div style={{ textAlign: 'center' }}>
        <Typography.Title>{title}</Typography.Title>
        <Typography.Paragraph>
            {
                desc.split('\n').map((desc,index) => {
                    return <span>
                        { index > 0 && <br />}
                        {desc}
                    </span>
                })
            }
        </Typography.Paragraph>
    </div>
}