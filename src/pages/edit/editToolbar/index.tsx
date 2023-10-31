import React from 'react'
import { CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, HeartOutlined, LockOutlined, UpOutlined, DownOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'

export const EditToolBar = () => {
    const dispatch = useDispatch()
    const deleteComp = () => {
        dispatch()
    }   
    return <div>
        <Tooltip title={'删除'}>
            <Button icon={<DeleteOutlined />} shape={'circle'}></Button>
        </Tooltip>
    </div>
}