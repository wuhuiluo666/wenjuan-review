import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { AllComponentProps } from '../questionComponent'
import { useGenNewSelectedId } from '../hooks/useGenNewSelectedId'
import cloneDeep from 'lodash.clonedeep'
import { useAddNewComponent } from '../hooks/useAddNewComponent'

// 单个组件的属性
export type ComponentProps = {
  fe_id: string
  title: string
  type: string
  isHidden?: boolean // 隐藏
  isLocked?: boolean // 锁定
  props: AllComponentProps
}

// 初始化状态的属性
export type ComponentStateProps = {
  selectedId: string
  componentsList: ComponentProps[]
  copiedComponet: ComponentProps | null
}

const initialState: ComponentStateProps = {
  selectedId: '',
  componentsList: [],
  copiedComponet: null
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
    ),
    // 删除组件
    deleteComp: produce((draft: ComponentStateProps) => {
      // 先在原来还没删除的数组上设置选中的id,再去splice数组
      const { selectedId = '', componentsList = [] } = draft
      const newSelectedId = useGenNewSelectedId(selectedId, componentsList)
      // 删除后要选中哪个组件
      draft.selectedId = newSelectedId
      console.log('draft333,', draft.selectedId) // 这个是新的
      console.log('selected444', selectedId) // 旧的
      // 拿到当前选中的下标
      const curCompIndex = componentsList.findIndex(
        (component: ComponentProps) => component.fe_id === selectedId
      )
      if (curCompIndex >= 0) {
        componentsList.splice(curCompIndex, 1)
      }
    }),
    // 锁定组件
    lockComp: produce(
      (
        draft: ComponentStateProps,
        action: PayloadAction<{ fe_id: string }>
      ) => {
        const { componentsList } = draft
        const { fe_id } = action.payload
        const curComp = componentsList.find(
          (c: ComponentProps) => c.fe_id === fe_id
        )
        if (!curComp) return
        curComp.isLocked = !curComp.isLocked
      }
    ),
    // 隐藏/解锁组件
    hideComp: produce(
      (
        draft: ComponentStateProps,
        action: PayloadAction<{ fe_id: string; hidden: boolean }>
      ) => {
        const { componentsList } = draft
        const { fe_id, hidden } = action.payload
        console.log('fe_id', fe_id)
        let newSelectedId
        // 如果需要隐藏 生成新的选中id
        if (hidden) {
          newSelectedId = useGenNewSelectedId(fe_id, componentsList)
        } else {
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId
        const curComponent = componentsList.find((c: any) => c.fe_id === fe_id)
        if (!curComponent) return
        curComponent.isHidden = hidden
      }
    ),
    // 复制组件
    copyComp: produce((draft: ComponentStateProps) => {
      // 拿到当前选中的组件
      const { selectedId, componentsList } = draft
      const currentComponent = componentsList.find(
        (component: ComponentProps) => component.fe_id === selectedId
      )
      if (!currentComponent) return
      draft.copiedComponet = cloneDeep(currentComponent)
    }),
    // 粘贴组件
    pasteComp: produce((draft: ComponentStateProps) => {
      const { copiedComponet } = draft
      if (copiedComponet === null) return
      copiedComponet.fe_id = nanoid()
      useAddNewComponent(draft, copiedComponet)
    }),
    // 改变组件标题名
    changeCompTitle: produce(
      (
        draft: ComponentStateProps,
        action: PayloadAction<{ newTitle: string }>
      ) => {
        const { selectedId, componentsList } = draft
        const { newTitle } = action.payload
        // 拿到当前选中的组件
        const currentComponent = componentsList.find(
          (c) => c.fe_id === selectedId
        )
        if (!currentComponent) return
        currentComponent.title = newTitle
      }
    ),
    // 上移选中
    prevSelectedComponent: produce((draft: ComponentStateProps) => {
      const { componentsList, selectedId } = draft
      const currentComponentIndex = componentsList.findIndex(
        (c) => c.fe_id === selectedId
      )
      if (currentComponentIndex < 0) return
      draft.selectedId = componentsList[currentComponentIndex - 1].fe_id
    }),
    // 下移选中
    nextSelectedComponent: produce((draft: ComponentStateProps) => {
      const { selectedId, componentsList } = draft
      const currentComponentIndex = componentsList.findIndex(
        (c) => c.fe_id === selectedId
      )
      if (currentComponentIndex < 0) return
      draft.selectedId = componentsList[currentComponentIndex + 1].fe_id
    })
  }
})

export const {
  resetComponent,
  changeSelectedId,
  changeComponentProps,
  addComp,
  deleteComp,
  lockComp,
  hideComp,
  copyComp,
  pasteComp,
  changeCompTitle,
  prevSelectedComponent,
  nextSelectedComponent
} = componentSlice.actions
export default componentSlice.reducer
