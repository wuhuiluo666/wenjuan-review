import React, { useEffect } from 'react'
import { ComponentCheckBoxProps } from '.'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

export const CheckBoxProps = (props: ComponentCheckBoxProps) => {
    const { title, isVertical, options } = props
    const [form] = useForm()
    useEffect(() => {

    },[])
    return <Form form={form} layout={'vertical'} initialValues={{ title, isVertical, options }}>
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
                                    <Space align={'center'} key={key}>
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
                                <Button block icon={<PlusOutlined />} onClick={() => add({ text: '', value: '', checked: false })}></Button>
                            </Form.Item>
                        </>
                    ))
                }
            </Form.List>
        </Form.Item>
        <Form.Item name={'isVertical'} valuePropName={'isVertical'} label={'是否垂直排列'}>
            <Checkbox></Checkbox>
        </Form.Item>
    </Form>
}