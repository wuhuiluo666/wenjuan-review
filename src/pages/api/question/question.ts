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
  const url = 'https://question-server.onrender.com/api/question'
  const data = await instance.get(url, {
    params: searchParams
  })
  return data
}

// 标星问卷
export const changeStarState = async (
  id: string,
  options: { [key: string]: any }
) => {
  const url = `https://question-server.onrender.com/api/question/${id}`
  const data = await instance.patch(url, options)
  return data
}

// 复制问卷
export const copyQuestion = async (id: string) => {
  const url = `https://question-server.onrender.com/api/question/copy/${id}`
  const data = await instance.post(url)
  return data
}

// 删除问卷
export const deleteQuestion = async (ids: string[]) => {
  const url = '/api/question'
  const data = await instance.delete(url, {
    data: ids
  })
  return data
}

// 单个问卷组件数组
export const getComponentList = async (id: string) => {
  const url = `/api/question/${id}`
  const data = await instance.get(url)
  return data
}
