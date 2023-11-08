import React, { useState } from 'react'
import { Layout, Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Lib } from '../lib/lib'
import { Layers } from '../layers'


// 左侧组件
export const LeftPanel = () => {
    const [activeKey, setActiveKey] = useState('lib')
    const tabsItem = [
        {
            key: 'lib',
            label: (
                <span>
                    <AppstoreOutlined />
                    组件库
                </span>
            ),
            children: (
                <Lib></Lib>
            )
        },
        {
            key: 'layers',
            label: (
                <span>
                    <BarsOutlined />
                    图层
                </span>
            ),
            children: (
                <Layers></Layers>
            )
        }
    ]
    const activeChange = (key: string) => {
        setActiveKey(key)
    }
    return <Tabs onChange={activeChange} activeKey={activeKey} items={tabsItem}></Tabs>
}