import React from 'react'
import LandingPage from './pages/LandingPage/LandingPage'
import CalledPage from './pages/CalledPage/CalledPage'
import OcurrencePage from './pages/OcurrencePage/OcurrencePage'

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
  {
    path: '/ocorrencia',
    exact: true,
    main: () => <OcurrencePage />,
  },
]

export default routes
