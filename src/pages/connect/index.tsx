import { Button, Typography } from 'antd'
import React, { useState } from 'react'
import { TestComponent } from './child'
import { NextComponent } from './next'
import { useSelector, useDispatch } from 'react-redux'

export const ThemeContext = React.createContext<{
    theme: string,
    toggleTheme?: () => void
}>({
    theme: 'dark'
})
export const Connect = () => {
    const counter = useSelector<{ counter: number }>(state => state.counter) as number
    const dispatch = useDispatch()
    const [theme, setTheme] = useState('dark')
    const toggleTheme: () => void = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    return <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <TestComponent></TestComponent>
        <NextComponent></NextComponent>
        <Button onClick={toggleTheme}></Button>
        <Typography>from react-redux: {counter}</Typography>
        <Button onClick={() => dispatch({ type: 'add' })}>我是增加</Button>
        <Button onClick={() => dispatch({ type: 'js' })}>我是减少</Button>
    </ThemeContext.Provider>
}
