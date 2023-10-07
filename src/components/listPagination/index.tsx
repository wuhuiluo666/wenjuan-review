import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

interface paginationProps {
    total: number
}

export const ListPagination = (props: paginationProps) => {
    const nav = useNavigate()
    const { total } = props
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    useEffect(() => {
        setPage(parseInt(searchParams.get('page') || '') || 1)
        setPageSize(parseInt(searchParams.get('pageSize') || '') || 10)
    }, [searchParams])
    const changePagination = (page: number, pageSize: number) => {
        searchParams.set('page', page.toString())
        searchParams.set('pageSize', pageSize.toString())
        nav({
            pathname,
            search: searchParams.toString()
        })
    }
    return <Pagination onChange={changePagination} current={page} pageSize={pageSize} total={total}></Pagination>
}