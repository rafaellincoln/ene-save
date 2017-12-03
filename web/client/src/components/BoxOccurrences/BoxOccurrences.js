import React from 'react'
import PropTypes from 'prop-types'
import style from './BoxOccurrences.css'

const styles = {}


class BoxOccurrences extends React.Component {
  componentWillMount() {}
  render() {
    let status
    if (this.props.status === 1) {
      status = <div style={styles.sts1}>EQUIPE MÉDICA</div>
    }
    if (this.props.status === 2) {
      status = <div style={styles.sts2}>A CAMINHO</div>
    }
    if (this.props.status === 3) {
      status = <div style={styles.sts3}>AGUARDANDO ATENDIMENTO</div>
    }
    if (this.props.status === 4) {
      status = <div style={styles.sts4}>EM ANDAMENTO</div>
    }
    if (this.props.status === 5) {
      status = <div style={styles.sts5}>EM ATENDIMENTO</div>
    }
    if (this.props.status === 6) {
      status = <div style={styles.sts6}>FINALIZADO</div>
    }

    return (
      <div className={style.box}>
        <p className={style.name}>{this.props.name}</p>
        <div className="Grid">
          <div className="Grid-cell u-size4of12">
            <p>{this.props.text}</p>
          </div>
          <div className="Grid-cell u-size3of12">
            <p>{this.props.date}</p>
          </div>
          <div className="Grid-cell u-size1of12">
            <button style={styles.button1}><img style={styles.img} src="/images/wifi.svg" /></button>
          </div>
          <div className="Grid-cell u-size1of12">
            <button style={styles.button1}><img style={styles.img} src="/images/shape.png" /></button>
          </div>
          <div className="Grid-cell u-size1of12">
            <button style={styles.button2}><img style={styles.img} src="/images/send-mail.svg" /></button>
          </div>
          <div className="Grid-cell u-size2of12">
            <div style={styles.s}>{status}</div>
          </div>
        </div>
      </div>
    )
  }
}

BoxOccurrences.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.number,
}

styles.img = {
  width: '13px',
  height: '18px',
}

styles.button1 = {
  width: '31px',
  height: '32px',
  borderRadius: '16px',
  backgroundColor: '#fdfdfd',
  border: 'solid 1px #d3cece',
}

styles.button2 = {
  width: '40px',
  height: '32px',
  borderRadius: '16px',
  backgroundColor: '#29c94c',
  border: 'solid 1px #1b9a37',
}

styles.s = {
  fontSize: '10px',
  textAlign: 'center',
  color: '#502525',
}

styles.sts1 = {
  width: '77px',
  height: '32px',
  borderRadius: '6px',
  backgroundColor: '#e7a5a5',
}


styles.sts2 = {
  width: '77px',
  height: '32px',
  borderRadius: '6px',
  backgroundColor: '#f0e5d5',
}

styles.sts3 = {
  width: '73px',
  height: '32px',
  borderRadius: '6px',
  backgroundColor: '#e1f0d5',
}

styles.sts4 = {
  width: '77px',
  height: '32px',
  borderRadius: '6px',
  backgroundColor: '#e7a5a5',
}

styles.sts5 = {
  width: '77px',
  height: '32px',
  borderRadius: '6px',
  backgroundColor: '#e7a5a5',
}

styles.sts6 = {
  width: '77px',
  height: '32px',
  borderRadius: '6px',
  backgroundColor: '#e1f0d5',
}

export default BoxOccurrences
