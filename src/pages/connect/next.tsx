import React, { useContext } from 'react'
import { ThemeContext } from '.'

export const NextComponent = () => {
    const context = useContext(ThemeContext)
    const { theme,toggleTheme } = context
    return <>
        <div>NextComponent current Theme: {theme}</div>
    </>
}   