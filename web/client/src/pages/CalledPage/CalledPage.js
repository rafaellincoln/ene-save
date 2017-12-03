import React from 'react'
// import style from './CalledPage.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import CalledPageMainContainer from '../../components/CalledPageMainContainer/CalledPageMainContainer'

class CalledPage extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <div>
        <Sidebar />
        <CalledPageMainContainer />
      </div>
    )
  }
}

export default CalledPage
