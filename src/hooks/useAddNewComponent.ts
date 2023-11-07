import { ComponentProps, ComponentStateProps } from '../store/component'

export const useAddNewComponent = (
  draft: ComponentStateProps,
  newComponent: ComponentProps
) => {
  // 首先找到当前项
  const { selectedId, componentsList } = draft
  const currentComponentIndex = componentsList.findIndex(
    (c: any) => c.fe_id === selectedId
  )
  if (currentComponentIndex >= 0) {
    // 添加到选中的下一项
    componentsList.splice(currentComponentIndex + 1, 0, newComponent)
  } else {
    // 没有选中就添加到末尾
    componentsList.push(newComponent)
  }
  // 添加完选中新添加的项
  draft.selectedId = newComponent.fe_id
}
