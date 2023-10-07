import React from 'react'
import styles from './index.module.scss'
import { useGetComponentList } from '../../hooks/useComponentList'
import { EditCanvas } from './editCanvas'


export const Edit = () => {
    const { loading } = useGetComponentList()
    return <div className={styles['edit-container']}>
        <div>
            Header
        </div>
        <div className={styles['content-wrapper']}>
            <div className={styles.content}>
                <div className={styles.left}>
                    {/* <LeftPanel /> */}
                    LEFT
                </div>
                <div className={styles.main}>
                    <div className={styles['canvas-warpper']}>
                        <EditCanvas loading={loading} />
                    </div>
                </div>
                <div className={styles.right}>
                    {/* <RightPanel /> */}
                    Right
                </div>
            </div>
        </div>
    </div>
}