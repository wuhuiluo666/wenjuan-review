import React from 'react'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Button, Space, Typography } from 'antd'
import { useNavigate } from 'react-router'
import { EditToolBar } from '../editToolbar'


export const EditHeader = () => {
    const nav = useNavigate()
    return <div className={styles['header-wrapper']}>
        <div className={styles.header}>
            <div className={styles.left}>
                <Space>
                    <Button type={'link'} onClick={() => nav(-1)} icon={<LeftOutlined />}></Button>
                    <Typography.Title level={2} style={{ margin: 0, lineHeight: '1', fontSize: '18px' }}>问卷标题</Typography.Title>
                </Space>
            </div>
            <div className={styles.main}>
                <EditToolBar />
            </div>
            <div className={styles.right}>
                <Space>
                    <Button type={'primary'}>保存</Button>
                    <Button>发布</Button>
                </Space>
            </div>
        </div>
    </div>
}