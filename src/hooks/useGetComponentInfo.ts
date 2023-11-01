import { useSelector } from 'react-redux'
import { StoreState } from '../store'
import { ComponentProps, ComponentStateProps } from '../store/component'
export const useGetComponentInfo = () => {
  const { selectedId, componentsList } = useSelector<StoreState>(
    (state) => state.components
  ) as ComponentStateProps
  // 判断当前选中的是哪一个组件
  const currentComponent = componentsList.find(
    (component: ComponentProps) => component.fe_id === selectedId
  )
  return {
    selectedId,
    componentsList,
    currentComponent
  }
}
