import { FC } from 'react'
import { ComponentInputProps } from './componentInput'
import { ComponentInputConfig } from './componentInput/component'

export type AllComponentProps = ComponentInputProps

// 所有组件的配置
export type ComponentConfig = {
  title: string
  type: string
  Component: FC<AllComponentProps>
  ComponentProps: FC<AllComponentProps>
  defaultProps: AllComponentProps
}

export const ComponentConfigList: ComponentConfig[] = [ComponentInputConfig]

export const getComponentByType = (type: string) => {
  return ComponentConfigList.find((component) => component.type === type)
}
