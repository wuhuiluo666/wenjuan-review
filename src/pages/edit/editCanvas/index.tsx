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
    const clickComponent = (e: MouseEvent, fe_id: string) => {
        e.stopPropagation()
        dispatch(changeSelectedId({ fe_id }))
    }
    return <div className={styles.canvas}>
        {
            componentsList.filter((c: any) => !c.isHidden).map((component: ComponentProps) => {
                const { isLocked, fe_id } = component
                const defaultComponentClassName = styles['component-wrapper']
                const selectedComponentClassName = styles.selected
                const lockComponentClassName = styles.locked
                const ComponentClassName = className({
                    [defaultComponentClassName]: true,
                    [selectedComponentClassName]: fe_id == selectedId,
                    [lockComponentClassName]: isLocked
                })
                return <div onClick={(e: any) => clickComponent(e, fe_id)} key={fe_id} className={ComponentClassName}>
                    <div className={styles.component}>
                        {genComponent(component)}
                    </div>
                </div>
            })
        }
    </div>
}