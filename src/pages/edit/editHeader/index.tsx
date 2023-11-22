import React, { ChangeEvent, useRef, useState } from 'react'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Button, Input, InputRef, Space, Typography } from 'antd'
import { useNavigate } from 'react-router'
import { EditToolBar } from '../editToolbar'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { changeQuestionTitle } from '../../../store/pageInfo'
import { useDispatch } from 'react-redux'

const { Title } = Typography

export const EditHeader = () => {
    const dispatch = useDispatch()
    const TitleElement = () => {
        const { title } = useGetPageInfo()
        const [isEdit, setIsEdit] = useState(false)
        const editInputRef = useRef<InputRef>(null)
        const editTitle = async () => {
            await setIsEdit(true)
            editInputRef.current && editInputRef.current.focus()
        }
        const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
            console.log('eee', e.target.value)
            const newTitle = e.target.value.trim()
            if (!newTitle) return
            dispatch(changeQuestionTitle({ newTitle }))
        }
        if (isEdit) return <Input onPressEnter={() => setIsEdit(false)} onChange={handleTitleChange} ref={editInputRef} style={{ width: '200px' }} value={title} onBlur={() => setIsEdit(false)} /> // 如果是编辑就显示输入框
        return <Space onClick={editTitle}>
            <Title style={{ margin: 0, lineHeight: 1, fontSize: '18px' }}>{title}</Title>
            <Button icon={<EditOutlined />} type={'link'}></Button>
        </Space>
    }

    const nav = useNavigate()
    return <div className={styles['header-wrapper']}>
        <div className={styles.header}>
            <div className={styles.left}>
                <Button type={'link'} onClick={() => nav(-1)} icon={<LeftOutlined />}>返回</Button>
                <TitleElement />
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