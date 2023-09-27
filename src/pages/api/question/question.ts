import instance, { ResType } from '../../../service/ajax'

export type SearchType = {
  keyword: string
  page: number
  pageSize: number
  isStar: boolean
  isDeleted: boolean
}

// 获取问卷列表
export const getQuestionList = async (
  searchParams: Partial<SearchType>
): Promise<ResType> => {
  const url = '/api/question'
  const data = (await instance.get(url, {
    params: searchParams
  })) as ResType
  return data
}
