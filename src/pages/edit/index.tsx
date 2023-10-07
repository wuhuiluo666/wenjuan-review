import React from 'react'
import styles from './index.module.scss'


export const Edit = () => {
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
                        {/* <EditCanvas loading={loading} /> */}
                        Canvsa
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