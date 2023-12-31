import React from 'react'
import styles from './index.module.scss'
import { useGetComponentList } from '../../hooks/useComponentList'
import { EditCanvas } from './editCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../store/component'
import { RightPanel } from './rihgtPanel'
import { LeftPanel } from './leftPanel'
import { EditHeader } from './editHeader'


export const Edit = () => {
    const { loading } = useGetComponentList()
    const dispatch = useDispatch()
    const clearSelectedId = () => {
        dispatch(changeSelectedId({ fe_id: '' }))
    }
    return <div className={styles['edit-container']}>
        <EditHeader />
        <div className={styles['content-wrapper']}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <LeftPanel></LeftPanel>
                </div>
                <div onClick={clearSelectedId} className={styles.main}>
                    <div className={styles['canvas-warpper']}>
                        <EditCanvas loading={loading} />
                    </div>
                </div>
                <div className={styles.right}>
                    <RightPanel />
                </div>
            </div>
        </div>
    </div>
}