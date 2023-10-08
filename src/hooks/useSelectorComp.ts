import { useSelector } from 'react-redux'
import { StoreState } from '../store'
import { ComponentStateProps } from '../store/component'

export const useSelectorComponent = () => {
  const { selectedId, componentsList } = useSelector<StoreState>(
    (state) => state.components
  ) as ComponentStateProps
  const currentComponent = componentsList.find(
    (component) => component.fe_id === selectedId
  )
  return {
    selectedId,
    componentsList,
    currentComponent
  }
}
