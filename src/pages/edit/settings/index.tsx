import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfo'


export const Settings = () => {
    const dispatch = useDispatch()
    const [form] = useForm()
    const { title, desc, js, css } = useGetPageInfo()
    const handleValuesChange = () => {
        dispatch(resetPageInfo(form.getFieldsValue()))
    }
    useEffect(() => {
        form.setFieldsValue({ title, desc, js, css })
    }, [title, desc, js, css])
    return <Form onValuesChange={handleValuesChange} initialValues={{ title, desc, js, css }} layout={'vertical'} form={form}>
        <Form.Item label={'页面标题'} name={'title'} rules={[{ required: true, message: '请输入页面标题' }]}>
            <Input placeholder={'请输入页面标题'} />
        </Form.Item>
        <Form.Item label={'页面描述'} name={'desc'}>
            <Input placeholder={'请输入页面描述'} />
        </Form.Item>
        <Form.Item label={'css'} name={'css'}>
            <Input placeholder={'请输入css'} />
        </Form.Item>
        <Form.Item label={'js'} name={'js'}>
            <Input placeholder={'请输入js'} />
        </Form.Item>
    </Form>
}