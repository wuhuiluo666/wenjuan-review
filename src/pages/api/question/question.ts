import instance from '../../../service/ajax'

export type SearchType = {
  keyword: string
  page: number
  pageSize: number
  isStar: boolean
  isDeleted: boolean
}

// 获取问卷列表
export const getQuestionList = async (
  searchParams: Partial<SearchType> = {}
) => {
  const url = '/api/question'
  const data = await instance.get(url, {
    params: searchParams
  })
  return data
}
