import { FC } from 'react'
import { ComponentInputProps } from './componentInput'
import { ComponentInputConfig } from './componentInput/component'
import { ComponentTitleProps } from './componentTitle'
import { ComponentTitleConfig } from './componentTitle/component'
import { ComponentParagraph } from './componentParagraph'
import { ComponentParagraphConfig } from './componentParagraph/component'

export type AllComponentProps = ComponentInputProps &
  ComponentTitleProps &
  ComponentParagraph

// 所有组件的配置
export type ComponentConfig = {
  title: string
  type: string
  Component: FC<AllComponentProps>
  ComponentProps: FC<AllComponentProps>
  defaultProps: AllComponentProps
}

export const ComponentConfigList: ComponentConfig[] = [
  ComponentInputConfig,
  ComponentTitleConfig,
  ComponentParagraphConfig
]

export const getComponentByType = (type: string) => {
  return ComponentConfigList.find((component) => component.type === type)
}
