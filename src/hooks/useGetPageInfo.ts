import { PageInfoProps } from '../store/pageInfo'
import { useSelector } from 'react-redux'
import { StoreState } from '../store'

export const useGetPageInfo = () => {
  const pageInfo = useSelector<StoreState>((state) => state.pageInfo) as PageInfoProps
  return pageInfo
}
