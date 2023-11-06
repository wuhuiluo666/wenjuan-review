import React, { useEffect } from 'react'
import { ComponentCheckBoxProps } from '.'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

export const CheckBoxProps = (props: ComponentCheckBoxProps) => {
    const { title, isVertical, options, onChange, disabled } = props
    const [form] = useForm()
    useEffect(() => {
        form.setFieldsValue({ title, isVertical, options })
    }, [title, isVertical, options])
    const valuesChange = () => {
        if (!onChange) return
        const values = form.getFieldsValue() as ComponentCheckBoxProps
        if (values.options) {
            // 过滤掉undefined的值
            values.options = values.options.filter(item => item.text.length !== null)
        }
        // values?.options?.map(item => {
        //     return {
        //         ...item,
        //         value: nanoid(5)
        //     }
        // })
        values?.options?.map((item: any) => {
            if (item.value) return
            item.value = nanoid(5)
        })
        onChange(values)
    }
    return <Form disabled={disabled} onValuesChange={valuesChange} form={form} layout={'vertical'} initialValues={{ title, isVertical, options }}>
        <Form.Item label={'复选框标题'} name={'title'}>
            <Input />
        </Form.Item>
        <Form.Item label={'选项'}>
            <Form.List name={'options'}>
                {
                    ((fileds, { add, remove }) => (
                        <>
                            {
                                fileds.map(({ key, name }, index) => (
                                    <Space align={'baseline'} key={key}>
                                        <Form.Item valuePropName={'checked'} name={[name, 'checked']}>
                                            <Checkbox></Checkbox>
                                        </Form.Item>
                                        <Form.Item name={[name, 'text']} rules={[{ required: true, message: "选项不能为空" }, {
                                            validator: (_, text) => {
                                                let count = 0
                                                const { options } = form.getFieldsValue()
                                                options.forEach((item: any) => {
                                                    if (item.text === text) count++
                                                })
                                                if (count === 1) return Promise.resolve()
                                                return Promise.reject(new Error('不允许存在重复的项'))
                                            }
                                        }]}>
                                            <Input placeholder={'输入选项'} />
                                        </Form.Item>
                                        {index > 0 && <MinusOutlined onClick={() => remove(name)} />}
                                    </Space>
                                ))
                            }
                            <Form.Item>
                                <Button block icon={<PlusOutlined />} onClick={() => add({ text: '', value: '', checked: false })}>添加选项</Button>
                            </Form.Item>
                        </>
                    ))
                }
            </Form.List>
        </Form.Item>
        <Form.Item name={'isVertical'} valuePropName={'checked'} label={'是否垂直排列'}>
            <Checkbox></Checkbox>
        </Form.Item>
    </Form>
}