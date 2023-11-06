import React from 'react'
import { CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, HeartOutlined, LockOutlined, UpOutlined, DownOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { deleteComp, hideComp, lockComp } from '../../../store/component'
import { useGetComponentInfo } from '../../../hooks/useGetComponentInfo'

export const EditToolBar = () => {
    const { selectedId, currentComponent } = useGetComponentInfo()
    const { isLocked } = currentComponent || {}
    const dispatch = useDispatch()
    // 删除
    const deleteComponent = () => {
        dispatch(deleteComp())
    }
    // 锁定
    const lockComponent = () => {
        dispatch(lockComp({ fe_id: selectedId }))
    }
    // 隐藏
    const hiddenComponent = () => {
        dispatch(hideComp({ fe_id: selectedId, hidden: true }))
    }
    return <div>
        <Space>
            <Tooltip title={'删除'}>
                <Button onClick={deleteComponent} icon={<DeleteOutlined />} shape={'circle'}></Button>
            </Tooltip>
            <Tooltip title={'锁定'}>
                <Button type={isLocked ? 'primary' : 'default'} onClick={lockComponent} icon={<LockOutlined />} shape={'circle'}></Button>
            </Tooltip>
            <Tooltip title={'隐藏'}>
                <Button onClick={hiddenComponent} icon={<EyeInvisibleOutlined />} shape={'circle'}></Button>
            </Tooltip>
        </Space>
    </div>
}