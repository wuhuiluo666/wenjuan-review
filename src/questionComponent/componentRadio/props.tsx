import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ComponentRadioProps } from '.'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

export const RadioProps = (props: ComponentRadioProps) => {
    const { title, isVertical, options, value, onChange, disabled } = props
    const [form] = useForm()
    useEffect(() => {
        form.setFieldsValue({ title, value, options, isVertical })
    }, [title, value, options, isVertical])
    const valuesChange = () => {
        if (!onChange) return
        const newValues = form.getFieldsValue() as ComponentRadioProps
        // 过滤掉options为undefined的值
        if (newValues.options) {
            newValues.options = newValues.options.filter(item => item.text.length !== null)
        }
        newValues?.options?.forEach(item => {
            if (item.value) return
            item.value = nanoid(5)
        })
        onChange(newValues)
    }
    return <Form disabled={disabled} onValuesChange={valuesChange} layout={'vertical'} form={form} initialValues={{ title, isVertical, options, value }}>
        <Form.Item label={'标题'} name={'title'} rules={[{ required: true, message: "请输入标题" }]}>
            <Input />
        </Form.Item>
        <Form.Item label={'选项'}>
            <Form.List name={'options'}>
                {
                    (fields, { add, remove }) => (
                        <>
                            {
                                fields.map(({ name, key }, index) => (
                                    <Space align={'baseline'} key={key}>
                                        <Form.Item name={[name, 'text']} rules={[{ required: true, message: '选项值不能为空' }, {
                                            validator: (_, text) => {
                                                // 不能重复
                                                const { options } = form.getFieldsValue()
                                                let count = 0
                                                options.map((item: any) => {
                                                    if (item.text === text) count++
                                                })
                                                if (count === 1) return Promise.resolve()
                                                return Promise.reject(new Error('和其他项重复了 '))
                                            }
                                        }]}>
                                            <Input placeholder={'请输入...'} />
                                        </Form.Item>
                                        {/* 删除图标 */}
                                        {/* 只有一项就不显示了 */}
                                        {index > 0 && <MinusOutlined onClick={() => remove(name)} />}
                                    </Space>
                                ))
                            }
                            <Form.Item>
                                <Button icon={<PlusOutlined />} type={'link'} onClick={() => add({ text: '', value: '' })}>添加选项</Button>
                            </Form.Item>
                        </>
                    )
                }
            </Form.List>
        </Form.Item>
        <Form.Item label={'默认选中'} name={'value'}>
            <Select value={value} options={options?.map((item) => ({ label: item.text || '', value: item.value }))}></Select>
        </Form.Item>
        <Form.Item label={'是否竖向排列'} name={'isVertical'} valuePropName={'checked'}>
            <Checkbox></Checkbox>
        </Form.Item>
    </Form >
}