import { useSelector } from 'react-redux'
import { StoreState } from '../store'
import { ComponentStateProps } from '../store/component'

export const useSelectorComponent = () => {
  const { selectedId, componentsList } = useSelector<StoreState>(
    (state) => state.components
  ) as ComponentStateProps
  return {
    selectedId,
    componentsList
  }
}
