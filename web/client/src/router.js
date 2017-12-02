import React from 'react'
import LandingPage from './pages/LandingPage/LandingPage'
import CalledPage from './pages/CalledPage/CalledPage'

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <LandingPage />,
  },
  {
    path: '/chamado',
    exact: true,
    main: () => <CalledPage />,
  },
]

export default routes
