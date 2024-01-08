import React, { useState } from 'react'
import { Button } from 'antd'

export const TestComponent = ({ updateCount }: { updateCount: (value: number) => void }) => {
    const [count, setCount] = useState(100)
    return <>
        <Button onClick={() => {
            const newCount = count + 1
            setCount(newCount)
            updateCount(newCount)
        }}>点我我给父组件传值
        </Button>
    </>
}   