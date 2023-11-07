import React from 'react'
import { CopyOutlined, BlockOutlined, DeleteOutlined, EyeInvisibleOutlined, HeartOutlined, LockOutlined, UpOutlined, DownOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { copyComp, deleteComp, hideComp, lockComp, pasteComp } from '../../../store/component'
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
    // 复制
    const copyComponent = () => {
        dispatch(copyComp())
    }
    // 粘贴
    const pasteComponent = () => {
        dispatch(pasteComp())
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
            <Tooltip title={'复制'}>
                <Button onClick={copyComponent} shape={'circle'} icon={<CopyOutlined />}></Button>
            </Tooltip>
            <Tooltip title={'粘贴'}>
                <Button onClick={pasteComponent} shape={'circle'} icon={<BlockOutlined />}></Button>
            </Tooltip>
        </Space>
    </div>
}