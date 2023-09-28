import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'

const { Search } = Input

export const InputSearch = () => {
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()
    const [keyword, setKeyWord] = useState('')
    const handleSearch = (keyword: string) => {
        nav({
            pathname,
            search: `keyword=${keyword}`
        })
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyWord(e.target.value)
    }
    useEffect(() => {
        setKeyWord(searchParams.get('keyword') || '')
    }, [searchParams])
    return <Search
        style={{ width: '260px' }}
        value={keyword}
        placeholder={'请输入关键字'}
        allowClear
        size={'large'}
        onSearch={handleSearch}
        onChange={handleChange}
    />
}