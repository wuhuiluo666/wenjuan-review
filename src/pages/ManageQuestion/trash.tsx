import React, { useState } from 'react'
import styles from './common.module.scss'
import { Typography, Spin, Table, Tag, Space, Button, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { InputSearch } from '../../components/inputSearch'
import { ListPagination } from '../../components/listPagination'
import { useFilterList } from '../../hooks/useFilterList'
import { useRequest } from 'ahooks'
import { changeStarState, deleteQuestion } from '../api/question/question'

const { Title } = Typography

const tableColumns = [
    {
        title: '问卷标题',
        dataIndex: 'title'
    },
    {
        title: '是否发布',
        dataIndex: 'isPublished',
        render: (isPublished: boolean) => isPublished ? <Tag color={'processing'}>已发布</Tag> : <Tag>未发布</Tag>
    },
    {
        title: '问卷数量',
        dataIndex: 'answerCount'
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt'
    }
]

export const Trash = () => {
    const { list, loading, refresh, total } = useFilterList(false, true)
    const [selectKeys, setSelectKeys] = useState<string[]>([])
    const { run: reCover } = useRequest(async () => {
        for await (const id of selectKeys) {
            await changeStarState(id, {
                isDeleted: false
            })
        }
    }, {
        manual: true,
        debounceWait: 500,
        onSuccess: () => {
            message.success('回复成功')
            refresh()
            setSelectKeys([])
        }
    })
    const { run: deleteKeys } = useRequest(async () => {
        await deleteQuestion(selectKeys)
    }, {
        manual: true,
        onSuccess: () => {
            message.success('删除成功')
            refresh()
            setSelectKeys([])
        }
    })
    const deleteArray = () => {
        Modal.confirm({
            title: '确定彻底删除该问卷?',
            content: '删除以后无法找回',
            icon: <ExclamationCircleOutlined />,
            onOk: deleteKeys
        })
    }
    const tableElement = (
        <>
            <Space>
                <Button onClick={reCover} type={'primary'} size={'large'} disabled={selectKeys.length === 0}>恢复</Button>
                <Button onClick={deleteArray} type={'default'} size={'large'} danger disabled={selectKeys.length === 0}>彻底删除</Button>
            </Space>
            <Table rowKey={row => row._id} rowSelection={{
                type: 'checkbox', onChange: (selectedRowKeys) => {
                    setSelectKeys(selectedRowKeys as string[])
                }
            }} pagination={false} dataSource={list} columns={tableColumns}></Table>
        </>
    )
    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title style={{ margin: '0' }} level={3}>回收站</Title>
            </div>
            <div className={styles.right}>
                <InputSearch />
            </div>
        </div>
        <div>
            {loading && <Spin size={'large'} style={{ position: 'absolute', left: '50%', top: '50%' }} />}
            {
                (!loading && list.length > 0) && tableElement
            }
        </div>
        {
            !loading && <div>
                <ListPagination total={total} />
            </div>
        }
    </>
}