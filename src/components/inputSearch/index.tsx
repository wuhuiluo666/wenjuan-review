import React, { ChangeEvent, useState } from 'react'
import { Input } from 'antd'

const { Search } = Input

export const InputSearch = () => {
    const [keyword, setKeyWord] = useState('')
    const handleSearch = () => {

    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyWord(e.target.value)
    }
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