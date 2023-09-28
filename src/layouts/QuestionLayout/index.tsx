import React from 'react'
import { Outlet } from 'react-router-dom'

export const QuestionLayout = () => {
    return <div style={{ height: '100vh' }}>
        <Outlet />
    </div>
}