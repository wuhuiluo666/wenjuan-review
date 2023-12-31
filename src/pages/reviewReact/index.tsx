import { Button } from "antd"
import { useReducer } from "react"

export const ReviewReact = () => {
    const [number, dispatchNumber] = useReducer((state: any, action: any) => {
        const { name, payload } = action
        switch (name) {
            case 'add':
                return state + 1
            case 'sub':
                return state - 1
            case 'reset':
                return payload
        }
        return state
    }, 0)
    return <div>
        {number}
        {/* 增加减少重置 */}
        <div>
            <Button onClick={() => dispatchNumber({ name: 'add' })}>增加</Button>
            <Button onClick={() => dispatchNumber({ name: 'sub' })}>减少</Button>
            <Button onClick={() => dispatchNumber({ name: 'reset' })}>重置</Button>
        </div>
    </div>
}