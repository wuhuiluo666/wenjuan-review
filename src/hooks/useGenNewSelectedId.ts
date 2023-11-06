import { ComponentProps } from '../store/component'

export const useGenNewSelectedId = (
  fe_id: string,
  componnetList: ComponentProps[]
) => { // 4
  const visibleComponentList = componnetList.filter(
    (c: ComponentProps) => !c.isHidden
  )
  const currentComponentIndex = visibleComponentList.findIndex(
    (c: ComponentProps) => c.fe_id === fe_id
  ) // 1
  // 没有选中返回值为-1
  if (currentComponentIndex < 0) return ''
  // 只有一项也返回空字符串
  let visibleLength = visibleComponentList.length
  if (visibleLength <= 1) return ''
  // 如果是最后一条
  let newSelectedId
  if (currentComponentIndex + 1 === visibleLength) {
    newSelectedId = visibleComponentList[currentComponentIndex - 1].fe_id
  } else {
    newSelectedId = visibleComponentList[currentComponentIndex + 1].fe_id
  }
  return newSelectedId
}
