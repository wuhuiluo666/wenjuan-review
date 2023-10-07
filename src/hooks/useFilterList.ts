import { useRequest } from 'ahooks'
import { getQuestionList } from '../pages/api/question/question'
import { useSearchParams } from 'react-router-dom'

export const useFilterList = (isStar?: boolean, isDeleted?: boolean) => {
  const [searchParams] = useSearchParams()
  const { data, loading, refresh } = useRequest(
    async () => {
      const data: any = await getQuestionList({
        keyword: searchParams.get('keyword') || '',
        isStar,
        isDeleted,
        page: parseInt(searchParams.get('page') || '') || 1,
        pageSize: parseInt(searchParams.get('pageSize') || '') || 10
      })
      return data
    },
    {
      refreshDeps: [searchParams]
    }
  )
  return {
    total: data?.total,
    list: data?.list,
    loading,
    refresh
  }
}
