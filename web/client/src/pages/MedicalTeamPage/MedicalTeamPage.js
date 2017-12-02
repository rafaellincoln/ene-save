import React from 'react'
// import style from './MedicalTeamPage.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import MedicalTeamPageMainContainer from '../../components/MedicalTeamPageMainContainer/MedicalTeamPageMainContainer'

class MedicalTeamPage extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <div>
        <Sidebar />
        <MedicalTeamPageMainContainer />
      </div>
    )
  }
}

export default MedicalTeamPage
