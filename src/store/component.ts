import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { AllComponentProps } from '../questionComponent'

// 单个组件的属性
export type ComponentProps = {
  fe_id: string
  title: string
  type: string
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
    resetComponent: (
      state: ComponentStateProps,
      action: PayloadAction<ComponentStateProps>
    ) => {
      return action.payload
    },
    changeSelectedId: produce(
      (
        draft: ComponentStateProps,
        action: PayloadAction<{ fe_id: string }>
      ) => {
        draft.selectedId = action.payload.fe_id
      }
    )
  }
})

export const { resetComponent, changeSelectedId } = componentSlice.actions
export default componentSlice.reducer
