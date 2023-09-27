import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { Home } from '../pages/Home'
import { ManageLayout } from '../layouts/ManageLayout'
import { List } from '../pages/ManageQuestion/list'
import { Star } from '../pages/ManageQuestion/star'
import { Trash } from '../pages/ManageQuestion/trash'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'manage',
                element: <ManageLayout />,
                children: [
                    {
                        path: 'list',
                        element: <List />
                    },
                    {
                        path: 'star',
                        element: <Star />
                    },
                    {
                        path: 'trash',
                        element: <Trash />
                    }
                ]
            }
        ]
    },
])

export default router