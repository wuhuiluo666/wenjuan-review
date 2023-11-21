import React, { ChangeEvent, useState } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useGetComponentInfo } from '../../../hooks/useGetComponentInfo'
import { ComponentProps, changeCompTitle, changeSelectedId, hideComp, lockComp } from '../../../store/component'
import { Button, Input, Space, message } from 'antd'
import { useDispatch } from 'react-redux'

export const Layers = () => {
    const dispatch = useDispatch()
    const [changingTitleId, setChangingTitleId] = useState('')
    const titleDefaultClassName = styles.title
    const selectedClassName = styles.selected
    const { selectedId, componentsList } = useGetComponentInfo()
    // 隐藏/显示组件
    const hiddenComponent = (fe_id: string, hidden: boolean) => {
        dispatch(hideComp({ fe_id, hidden }))
    }
    // 锁定组件
    const lockedComponent = (fe_id: string) => {
        dispatch(lockComp({ fe_id }))
    }
    // 点击title时
    const changingTitle = (fe_id: string) => {
        const currentComponent = componentsList.find(c => c.fe_id === fe_id)
        if (currentComponent && currentComponent.isHidden) {
            message.info('不能选中被隐藏的组件')
            return
        }
        // 得先选中的是选中的那个才去显示标题去修改标题
        if (fe_id !== selectedId) {
            dispatch(changeSelectedId({ fe_id }))
            setChangingTitleId('')
            return
        }
        setChangingTitleId(fe_id)
    }
    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.trim()
        if (!inputValue) return
        dispatch(changeCompTitle({ newTitle: inputValue }))
    }
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
                        <div className={titleClassName} onClick={() => changingTitle(fe_id)}>
                            {changingTitleId === fe_id && <Input onChange={handleChangeTitle} value={title} onPressEnter={() => setChangingTitleId('')} onBlur={() => setChangingTitleId('')} />}
                            {changingTitleId !== fe_id && title}
                        </div>
                        <div className={styles.handler}>
                            <Space>
                                <Button onClick={() => hiddenComponent(fe_id, !isHidden)} type={isHidden ? 'primary' : 'text'} size={'small'} className={!isHidden ? styles.btn : ''} shape={'circle'} icon={<EyeInvisibleOutlined />}></Button>
                                <Button onClick={() => lockedComponent(fe_id)} type={isLocked ? 'primary' : 'text'} size={'small'} className={!isLocked ? styles.btn : ''} shape={'circle'} icon={<LockOutlined />}></Button>
                            </Space>
                        </div>
                    </div>
                )
            })
        }
    </div>
}