import React from 'react'
import styles from './index.module.scss'
import { useSelectorComponent } from "../../../hooks/useSelectorComp"
import { ComponentProps, changeSelectedId } from '../../../store/component'
import className from 'classnames'
import { getComponentByType } from '../../../questionComponent'
import { useDispatch } from 'react-redux'

export const EditCanvas = ({ loading }: { loading: boolean }) => {
    const dispatch = useDispatch()
    const { selectedId, componentsList } = useSelectorComponent()
    const genComponent = (component: ComponentProps) => {
        const { props, type } = component
        const ComponentConfig = getComponentByType(type)
        if (!ComponentConfig) return null
        const { Component } = ComponentConfig
        return <Component {...props} />
    }
    return <div className={styles.canvas}>
        {
            componentsList.map((component: ComponentProps) => {
                const { fe_id } = component
                const defaultComponentClassName = styles['component-wrapper']
                const selectedComponentClassName = styles.selected
                const ComponentClassName = className({
                    [defaultComponentClassName]: true,
                    [selectedComponentClassName]: fe_id === selectedId
                })
                return <div onClick={() => dispatch(changeSelectedId({ fe_id }))} key={fe_id} className={ComponentClassName}>
                    <div className={styles.component}>
                        {genComponent(component)}
                    </div>
                </div>
            })
        }
    </div>
}