import React from 'react'
import { CopyOutlined, BlockOutlined, DeleteOutlined, EyeInvisibleOutlined, HeartOutlined, LockOutlined, UpOutlined, DownOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { copyComp, deleteComp, hideComp, lockComp, nextSelectedComponent, pasteComp, prevSelectedComponent, } from '../../../store/component'
import { useGetComponentInfo } from '../../../hooks/useGetComponentInfo'

export const EditToolBar = () => {
    const { selectedId, currentComponent, componentsList } = useGetComponentInfo()
    const { isLocked } = currentComponent || {}
    const dispatch = useDispatch()
    const isFirstOrNoSelect = componentsList.findIndex(c => c.fe_id === selectedId) <= 0
    const isLastOrNoSelect = (componentsList.findIndex(c => c.fe_id === selectedId) + 1 == componentsList.length) || componentsList.findIndex(c => c.fe_id === selectedId) < 0
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
    // 上一个
    const prevComponent = () => {
        dispatch(prevSelectedComponent())
    }
    // 下一个
    const nextComponent = () => {
        dispatch(nextSelectedComponent())
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
            <Tooltip title={'上移'}>
                <Button onClick={prevComponent} disabled={isFirstOrNoSelect} shape={'circle'} icon={<UpOutlined />}></Button>
            </Tooltip>
            <Tooltip title={'下移'}>
                <Button disabled={isLastOrNoSelect} onClick={nextComponent} shape={'circle'} icon={<DownOutlined />}></Button>
            </Tooltip>
        </Space>
    </div>
}