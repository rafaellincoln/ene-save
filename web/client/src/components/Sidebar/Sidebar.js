import React from 'react'
import style from './Sidebar.css'

class Sidebar extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className={style.sidebar}>
        <div className="group-item">
          <a href="#" className={`list-group-item ${style.sidebarLogo}`}>
            <img src="/images/logo.png" /></a>
          <a href="#" className={`list-group-item ${style.sidebarList}`}>
            <p>Criar Chamada</p></a>
          <a href="/ocorrencia" className={`list-group-item ${style.sidebarList}`}>
            <p>Ocorrência</p></a>
          <a href="#" className={`list-group-item ${style.sidebarList}`}>
            <p>Equipe Médica</p></a>
        </div>
      </div>
    )
  }
}

export default Sidebar
