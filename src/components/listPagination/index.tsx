import React, { useState } from 'react'
import { Pagination } from 'antd'
import { useSearchParams } from 'react-router-dom'

// interface paginationProps {
//     total: number
// }

export const ListPagination = () => {
    const [searchParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const changePagination = (page: number, pageSize: number) => {
        searchParams.set('page', page.toString())
        searchParams.set('pageSize', pageSize.toString())
    }
    return <Pagination onChange={changePagination} current={page} pageSize={pageSize} total={24}></Pagination>
}