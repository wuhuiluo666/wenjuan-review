import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

export const ReviewReact = () => {
    // 类似防抖，如果不清除副作用值改变一次就会一秒钟打印一次 清除后只打印最后的那一次结果
    // const [value, setValue] = useState(0)
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         console.log('value', value)
    //     }, 1000)
    //     return () => {
    //         clearTimeout(timer)
    //     }
    // }, [value])
    // const addValue = () => {
    //     setValue(value + 1)
    // }
    // return <div>
    //     <Button onClick={addValue}>value: {value}</Button>
    // </div>
    return <div>
    </div>
}