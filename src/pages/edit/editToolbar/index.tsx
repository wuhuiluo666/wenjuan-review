import React from 'react'
import { CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, HeartOutlined, LockOutlined, UpOutlined, DownOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { deleteComp } from '../../../store/component'

export const EditToolBar = () => {
    const dispatch = useDispatch()
    const deleteComponent = () => {
        dispatch(deleteComp())
    }
    return <div>
        <Tooltip title={'删除'}>
            <Button onClick={deleteComponent} icon={<DeleteOutlined />} shape={'circle'}></Button>
        </Tooltip>
    </div>
}