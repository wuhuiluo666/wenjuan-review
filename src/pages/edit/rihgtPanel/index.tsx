import React, { useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { PropsForm } from '../propsForm'

export const RightPanel = () => {
    const [activeKey, setActiveKey] = useState('props')
    const tabItems = [
        {
            key: 'props',
            label: <span>
                <FileTextOutlined />
                属性
            </span>,
            children: <PropsForm />
        },
        {
            key: 'settings',
            label: <span>
                <SettingOutlined />
                设置
            </span>
        }
    ]
    const changeActiveKey = (key: string) => {
        setActiveKey(key)
    }
    return <Tabs onChange={changeActiveKey} activeKey={activeKey} items={tabItems} />
}