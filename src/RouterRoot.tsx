import { createBrowserRouter, Outlet } from 'react-router-dom'
import NotFounPage from './pages/404'
import HomePage from './pages/home'
import PageEditerPage from './pages/page-edit'

export const routerRoot = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/page/edit',
    element: <PageEditerPage />,
  },
  {
    path: '*',
    element: <NotFounPage />,
  },
])
