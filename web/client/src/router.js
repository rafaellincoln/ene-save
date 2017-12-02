import React from 'react'
import LandingPage from './pages/LandingPage/LandingPage'
import CalledPage from './pages/CalledPage/CalledPage'
import OcurrencePage from './pages/OcurrencePage/OcurrencePage'
import MedicalTeamPage from './pages/MedicalTeamPage/MedicalTeamPage'

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
    path: '/despacho',
    exact: true,
    main: () => <OcurrencePage />,
  },
  {
    path: '/equipe-medica',
    exact: true,
    main: () => <MedicalTeamPage />,
  },
]

export default routes
