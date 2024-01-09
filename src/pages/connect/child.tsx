import React, { useContext } from 'react'
import { ThemeContext } from '.'

export const TestComponent = () => {
    const context = useContext(ThemeContext)
    const { theme, toggleTheme } = context
    return <>
        <div>TestComponent current Theme: {theme}</div>
    </>
}   