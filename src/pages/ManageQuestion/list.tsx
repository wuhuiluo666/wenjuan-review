import React, { useEffect, useState } from 'react'
import { useDebounceFn, useRequest } from 'ahooks'
import { getQuestionList } from '../api/question/question'
import styles from './common.module.scss'
import { Empty, Spin, Typography } from 'antd'
import QuestionCard from '../../components/questionCard'
import { InputSearch } from '../../components/inputSearch'
import { useSearchParams } from 'react-router-dom'

const PAGE_SIZE = 10

export const List = () => {
    const [started, setStarted] = useState(true)
    const [searchParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [questionList, setQuestionList] = useState([
        {
            answerCount: 78,
            createdAt:
                "1973-12-29 11:09:57",
            isDeleted:
                false,
            isPublished
                :
                false,
            isStar
                :
                false,
            title
                :
                "面难性她基按入",
            _id
                :
                "210000199610092564"
        },
        {
            answerCount
                :
                72,
            createdAt
                :
                "1990-02-04 11:08:09",
            isDeleted
                :
                false,
            isPublished
                :
                false,
            isStar
                :
                false,
            title
                :
                "地制局须",
            _id
                :
                "450000200803285821"
        }
    ])
    // const hasMoreData = page <= Math.round(total / PAGE_SIZE) + 1
    // // 加载问卷数据
    // const { run: loadQuestionList, loading } = useRequest(async () => {
    //     const data = await getQuestionList({
    //         page,
    //         pageSize: 10,
    //         keyword: searchParams.get('keyword') || ''
    //     })
    //     return data
    // }, {
    //     manual: true,
    //     onSuccess: (res: any) => {
    //         console.log('res', JSON.parse(JSON.stringify(res.list)))
    //         const { list: resultList = [], total } = res
    //         setQuestionList(questionList.concat(resultList))
    //         setTotal(total)
    //         setPage(page + 1)
    //     }
    // })
    // const { run: debounceLoadQuestionList } = useDebounceFn(() => {
    //     // 文档区域高度
    //     const clientHeight = window.innerHeight
    //     // 卷曲的高度
    //     const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    //     // 所有内容的高度
    //     const scrollHeight = document.body.scrollHeight
    //     if (scrollHeight <= clientHeight + scrollTop) {
    //         loadQuestionList()
    //         setStarted(false)
    //     }
    // },
    //     {
    //         wait: 500
    //     })
    // // 一进入页面请求列表数据
    // useEffect(() => {
    //     setQuestionList([])
    //     setStarted(true)
    //     setPage(1)
    //     setTotal(0)
    //     debounceLoadQuestionList()
    // }, [searchParams])
    // // 控制滑动时请求次数，并且监听page变化时在重新触发,一进入的时候是0
    // // 只有在page改变的时候加载并且触底才会加载
    // useEffect(() => {
    //     if (hasMoreData) {
    //         window.addEventListener('scroll', debounceLoadQuestionList)
    //     }
    //     return () => {
    //         window.removeEventListener('scroll', debounceLoadQuestionList)
    //     }
    // }, [page])
    // const loadMoreElement = () => {
    //     if (loading) {
    //         return <Spin />
    //     }
    //     if (total === 0) return <Empty description={'没有数据'} />
    //     if (!hasMoreData) return <Typography.Title level={3} style={{ margin: 0 }}>没有更多数据了</Typography.Title>
    //     return <div>加载更多</div>
    // }
    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Typography.Title level={3} style={{ margin: '0' }}>问卷列表</Typography.Title>
            </div>
            <div className={styles.right}>
                <InputSearch />
            </div>
        </div >
        <div>
            {
                questionList.length > 0 && questionList.map((item: any) => <QuestionCard key={item._id} {...item} />)
            }
        </div>
        <div className={styles.footer}>
            加载更多
            {/* {loadMoreElement()} */}
        </div>
    </>
}