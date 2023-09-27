import React from 'react'
import { useRequest } from 'ahooks'
import { getQuestionList } from '../api/question/question'


export const List = () => {
    const { run: loadQuestionList, loading } = useRequest(async () => {
        const data = await getQuestionList({
            page: 1,
            pageSize: 10
        })
        return data
    }, {
        manual: true,
        onSuccess: (res) => {
            console.log('res', res)
        }
    })
    return <div>
    </div>
}