import React, { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { getQuestionList } from '../api/question/question'
import styles from './common.module.scss'
import { Typography } from 'antd'
import QuestionCard from '../../components/questionCard'

export const List = () => {
    const [questionList, setQuestionList] = useState([])
    const { run: loadQuestionList, loading } = useRequest(async () => {
        const data = await getQuestionList({
            page: 1,
            pageSize: 10
        })
        return data
    }, {
        manual: true,
        onSuccess: (res: any) => {
            const { list: resultList = [], total } = res
            setQuestionList(resultList)
        }
    })
    useEffect(() => {
        loadQuestionList()
    }, [])
    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Typography.Title level={3} style={{ margin: '0' }}>问卷列表</Typography.Title>
            </div>
            <div className={styles.right}>
                Right
            </div>
        </div >
        <div>
            {
                questionList.length > 0 && questionList.map((item: any) => <QuestionCard key={item._id} {...item} />)
            }
        </div>
    </>
}