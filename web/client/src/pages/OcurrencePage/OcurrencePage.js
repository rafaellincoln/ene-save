import React from 'react'
// import style from './OcurrencePage.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import OcurrencePageMainContainer from '../../components/OcurrencePageMainContainer/OcurrencePageMainContainer'

class OcurrencePage extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <div>
        <Sidebar />
        <OcurrencePageMainContainer />
      </div>
    )
  }
}

export default OcurrencePage
