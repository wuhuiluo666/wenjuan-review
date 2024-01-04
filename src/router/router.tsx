import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { Home } from '../pages/Home'
import { ManageLayout } from '../layouts/ManageLayout'
import { List } from '../pages/ManageQuestion/list'
import Star from '../pages/ManageQuestion/star'
import { Trash } from '../pages/ManageQuestion/trash'
import { QuestionLayout } from '../layouts/QuestionLayout'
// import { Edit } from '../pages/Edit'
import { ReviewReact } from '../pages/reviewReact'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
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
    {
        path: 'review',
        element: <ReviewReact />
    },
    // {
    //     path: 'question',
    //     element: <QuestionLayout />,
    //     children: [{
    //         path: 'edit/:id',
    //         element: <Edit />
    //     }
    //     ]
    // }
])

export default router