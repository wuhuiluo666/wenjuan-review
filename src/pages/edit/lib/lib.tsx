import React from 'react'
import { ComponentConfig, ComponentConfigGroup } from '../../../questionComponent'
import { Typography } from 'antd'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { addComp } from '../../../store/component'


export const Lib = () => {
    const dispatch = useDispatch()
    const genComponent = (component: ComponentConfig) => {
        const { title, type, Component, defaultProps } = component
        const addComponent = () => {
            dispatch(addComp({
                fe_id: nanoid(5),
                title,
                isHidden: false,
                type,
                props: {
                    ...defaultProps
                }
            }))
        }
        return <div key={type} className={styles.wrapper} onClick={addComponent}>
            <div className={styles.component}>
                <Component />
            </div>
        </div>
    }
    return <div>
        {
            ComponentConfigGroup.map((component: any) => {
                const { groupId, groupName, components } = component
                return <div key={groupId}>
                    <Typography.Paragraph>{groupName}</Typography.Paragraph>
                    {
                        components.map((component: ComponentConfig) => genComponent(component))
                    }
                </div>
            })
        }
    </div>
}