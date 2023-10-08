import React from 'react'
import { useSelectorComponent } from '../../../hooks/useSelectorComp'
import { AllComponentProps, getComponentByType } from '../../../questionComponent'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/component'

export const PropsForm = () => {
    const dispatch = useDispatch()
    const NoProp = () => {
        return <div style={{ textAlign: 'center' }}>
            未选中组件
        </div>
    }
    const { currentComponent, selectedId } = useSelectorComponent()
    if (!currentComponent) return <NoProp />
    const { props, type } = currentComponent
    const componentConfig = getComponentByType(type)
    if (!componentConfig) return <NoProp />
    const { ComponentProps } = componentConfig
    const onChange = (newProps: AllComponentProps) => {
        if (!currentComponent) return
        dispatch(changeComponentProps({ fe_id: selectedId, newProps }))
    }
    return <ComponentProps {...props} onChange={onChange} />
}