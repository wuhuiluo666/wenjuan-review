import { Button } from 'antd'
import React, { useState } from 'react'
import { TestComponent } from './child'

export const Connect = () => {
    const [count, setCount] = useState(0)
    return <div>
        <div>received from child: {count}</div>
        <TestComponent updateCount={(value: number) => setCount(value)}></TestComponent>
    </div>
}
