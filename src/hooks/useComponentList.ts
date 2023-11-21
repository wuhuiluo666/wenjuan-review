import { useRequest } from 'ahooks'
import { getComponentList } from '../pages/api/question/question'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponent } from '../store/component'
import { resetPageInfo } from '../store/pageInfo'

export const useGetComponentList = () => {
  const dispatch = useDispatch()
  const { id = '' } = useParams()
  const { run, loading, data } = useRequest(
    async () => {
      if (!id) throw new Error('没有问卷id')
      const data = await getComponentList(id)
      return data
    },
    {
      manual: true
    }
  )
  useEffect(() => {
    if (!data) return
    const {
      componentsList = [],
      title,
      desc,
      js,
      css,
      isPublished
    } = data as any
    dispatch(
      resetComponent({
        componentsList,
        selectedId: '',
        copiedComponet: null
      })
    )
    dispatch(
      resetPageInfo({
        title,
        desc,
        js,
        css,
        isPublished
      })
    )
  }, [data])

  // 只有id变化才会引起data变化
  useEffect(() => {
    run()
  }, [id])

  return {
    loading
  }
}
