import React from 'react'
// import style from './LandingPage.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import LandingPageMainContainer from '../../components/LandingPageMainContainer/LandingPageMainContainer'

class LandingPage extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <div>
        <Sidebar />
        <LandingPageMainContainer />
      </div>
    )
  }
}

export default LandingPage
