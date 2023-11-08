import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useGetComponentInfo } from '../../../hooks/useGetComponentInfo'
import { ComponentProps } from '../../../store/component'
import { Button, Space } from 'antd'

export const Layers = () => {
    const titleDefaultClassName = styles.title
    const selectedClassName = styles.selected
    const { selectedId, componentsList } = useGetComponentInfo()
    return <div>
        {
            componentsList.map((c: ComponentProps) => {
                const { fe_id, title, isLocked, isHidden } = c
                const titleClassName = classNames({
                    [titleDefaultClassName]: true,
                    [selectedClassName]: fe_id === selectedId
                })
                return (
                    <div className={styles.wrapper} key={fe_id}>
                        <div className={titleClassName}>
                            {title}
                        </div>
                        <div className={styles.handler}>
                            <Space>
                                <Button type={isLocked ? 'primary' : 'text'} size={'small'} className={!isLocked ? styles.btn : ''} shape={'circle'} icon={<EyeInvisibleOutlined />}></Button>
                                <Button type={isLocked ? 'primary' : 'text'} size={'small'} className={!isLocked ? styles.btn : ''} shape={'circle'} icon={<LockOutlined />}></Button>
                            </Space>
                        </div>
                    </div>
                )
            })
        }
    </div>
}