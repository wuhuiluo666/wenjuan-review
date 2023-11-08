import React from 'react'
import styles from './index.modules.scss'
import classNames from 'classnames'
import { useGetComponentInfo } from '../../../hooks/useGetComponentInfo'
import { ComponentProps } from '../../../store/component'
import { Space } from 'antd'

export const Layers = () => {
    const titleDefaultClassName = styles.title
    const selectedClassName = styles.selected
    const { selectedId, componentsList } = useGetComponentInfo()
    return <div>
        {
            componentsList.map((c: ComponentProps) => {
                const { fe_id, title } = c
                const titleClassName = classNames({
                    [titleDefaultClassName]: true,
                    [selectedClassName]: fe_id === selectedId
                })
                return (
                    <div className={titleClassName} key={fe_id}>
                        <div className={titleDefaultClassName}>
                            {title}
                        </div>
                        <div className={styles.handler}>
                            <Space>
                    
                            </Space>
                        </div>
                    </div>
                )
            })
        }
    </div>
}