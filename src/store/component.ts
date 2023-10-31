import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { AllComponentProps } from '../questionComponent'

// 单个组件的属性
export type ComponentProps = {
  fe_id: string
  title: string
  type: string
  isHidden: boolean
  props: AllComponentProps
}

// 初始化状态的属性
export type ComponentStateProps = {
  selectedId: string
  componentsList: ComponentProps[]
}

const initialState: ComponentStateProps = {
  selectedId: '',
  componentsList: []
}

const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    // 返回组件列表
    resetComponent: (
      state: ComponentStateProps,
      action: PayloadAction<ComponentStateProps>
    ) => {
      return action.payload
    },
    // 点击选中哪个组件
    changeSelectedId: produce(
      (
        draft: ComponentStateProps,
        action: PayloadAction<{ fe_id: string }>
      ) => {
        draft.selectedId = action.payload.fe_id
      }
    ),
    // 改变组件属性
    changeComponentProps: produce(
      (
        draft: ComponentStateProps,
        action: PayloadAction<{ fe_id: string; newProps: AllComponentProps }>
      ) => {
        const { fe_id, newProps } = action.payload
        // 找到当前要改变属性的组件
        const currentComponent = draft.componentsList.find(
          (component) => component.fe_id === fe_id
        )
        if (currentComponent) {
          currentComponent.props = {
            ...currentComponent.props,
            ...newProps
          }
        }
      }
    ),
    // 添加组件
    addComp: produce(
      (draft: ComponentStateProps, action: PayloadAction<ComponentProps>) => {
        // 拿到当前选中的组件下标
        const curCompIndex = draft.componentsList.findIndex(
          (component) => component.fe_id === draft.selectedId
        )
        if (curCompIndex >= 0) {
          // 有选中 增加到选中的下一个
          draft.componentsList.splice(curCompIndex + 1, 0, action.payload)
        } else {
          // 没有选中 增加到最后一个
          draft.componentsList.push(action.payload)
        }
        // 将新增的设置为选中状态
        draft.selectedId = action.payload.fe_id
      }
    )
  }
})

export const {
  resetComponent,
  changeSelectedId,
  changeComponentProps,
  addComp
} = componentSlice.actions
export default componentSlice.reducer
