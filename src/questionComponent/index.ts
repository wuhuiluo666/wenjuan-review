import { FC } from 'react'
import { ComponentInputProps } from './componentInput'
import { ComponentInputConfig } from './componentInput/component'
import { ComponentTitleProps } from './componentTitle'
import { ComponentTitleConfig } from './componentTitle/component'
import { ComponentParagraph } from './componentParagraph'
import { ComponentParagraphConfig } from './componentParagraph/component'
import { ComponentInfoProps } from './componentInfo'
import { ComponentInfoConfig } from './componentInfo/component'
import { ComponentTextAreaProps } from './componentTextArea'
import { ComponentTextAreaConfig } from './componentTextArea/component'
import { ComponentRadioProps } from './componentRadio'
import { ComponentRadioConfig } from './componentRadio/component'
import { ComponentCheckBoxProps } from './componentCheckBox'
import { ComponentCheckBoxConfig } from './componentCheckBox/component'

export type AllComponentProps = ComponentInputProps &
  ComponentTitleProps &
  ComponentParagraph &
  ComponentInfoProps &
  ComponentTextAreaProps &
  ComponentRadioProps &
  ComponentCheckBoxProps

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
  ComponentParagraphConfig,
  ComponentInfoConfig,
  ComponentTextAreaConfig,
  ComponentRadioConfig,
  ComponentCheckBoxConfig
]

export const getComponentByType = (type: string) => {
  console.log('type', type)
  return ComponentConfigList.find((component) => component.type === type)
}
