import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { Button, Divider, Space } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'

export const ManageLayout = () => {
    const { pathname } = useLocation()
    const nav = useNavigate()
    return <div className={styles.container}>
        <div className={styles.left}>
            <Space direction={'vertical'}>
                <Button icon={<PlusOutlined />} size={'large'} type={'default'}>创建问卷</Button>
                <Divider />
                <Button icon={<BarsOutlined />} onClick={() => nav('/manage/list')} type={pathname.startsWith('/manage/list') ? 'primary' : 'default'} size={'large'} >我的问卷</Button>
                <Button icon={<StarOutlined />} onClick={() => nav('/manage/star')} type={pathname.startsWith('/manage/star') ? 'primary' : 'default'} size={'large'}>星标问卷</Button>
                <Button icon={<DeleteOutlined />} onClick={() => nav('/manage/trash')} type={pathname.startsWith('/manage/trash') ? 'primary' : 'default'} size={'large'}>回收站</Button>
            </Space>
        </div>
        <div className={styles.right}>
            <Outlet />
        </div>
    </div>
}