import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { PropsForm } from '../propsForm'
import { useGetComponentInfo } from '../../../hooks/useGetComponentInfo'
import { Settings } from '../settings'

enum KyeProp {
    PROP_KEY = 'props',
    SETTING_KEY = 'settings'
}

export const RightPanel = () => {
    const { selectedId } = useGetComponentInfo()
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
            </span>,
            children: <Settings />
        }
    ]
    useEffect(() => {
        if (selectedId) {
            setActiveKey(KyeProp.PROP_KEY)
        } else {
            setActiveKey(KyeProp.SETTING_KEY)
        }
    }, [selectedId])
    const changeActiveKey = (key: string) => {
        setActiveKey(key)
    }
    return <Tabs onChange={changeActiveKey} activeKey={activeKey} items={tabItems} />
}