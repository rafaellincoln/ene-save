import React, {
  Component,
} from 'react'
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'
import moment from 'moment'
import {
  loadOccurrence,
  updateOccurrenceStatus,
} from '../actions/occurrence'
import { css, withStyles } from '../styles/HackingTheFire'
import BottomView from '../ui/BottomView'
import StatusCard from '../ui/StatusCard'

const { height, width } = Dimensions.get('window')

class _Call extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.props.loadOccurrence(this.props.occurrence.idOccurrence)
  }

  updateOccurrenceStatus = (type) => {
    const payload = {
      id: this.props.occurrence.idOccurrence,
      status: [
        {
          type,
          date: moment().utc(),
        },
      ],
    }
    this.props.updateOccurrenceStatus(payload)
  }

  renderStatus() {
    const status = this.props.occurrence.status[this.props.occurrence.status.length - 1].type
    const three = (
      <StatusCard
        title="Aguardando atendimento"
        statusCode={3}
        onPress={() => this.updateOccurrenceStatus(4)}
      />
    )
    const four = (
      <StatusCard
        title="Em andamento"
        statusCode={4}
        timeLeft={33}
        onPress={() => this.updateOccurrenceStatus(5)}
      />
    )
    const five = (
      <StatusCard
        title="Em atendimento"
        statusCode={5}
        timeSpent={10}
        onPressCheckout={() => {
          this.updateOccurrenceStatus(6)
        }}
        onPressEmergency={() => this.props.navigation.navigate('medicalEmergency')}
      />
    )
    if (status === 3) {
      return three
    }
    if (status === 4) {
      return four
    }
    return five
  }

  render() {
    if (!this.props.occurrence.address) {
      return (
        <ScrollView
          {...css(this.props.styles.container)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Houve um problema ao carregar a ocorrência. Faça um pull refresh
            para tentar atualizar.</Text>
        </ScrollView>
      )
    }
    return (
      <BottomView
        navigation={this.props.navigation}
        occurrence={this.props.occurrence}
        updateOccurrence={() => this.updateOccurrenceStatus()}
      >
        <Text {...css(this.props.styles.subtitle)}>Status da ocorrência:</Text>
        {this.renderStatus()}
        <Text {...css(this.props.styles.subtitle)}>Dados do contribuinte:</Text>
        <View
          {...css(this.props.styles.dataContainer)}
        >
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Nome do colaborador
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.name_solicitant}
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Telefone
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.phone}
          </Text>
        </View>
        <Text {...css(this.props.styles.subtitle)}>Local do acidente:</Text>
        <View
          {...css(this.props.styles.dataContainer)}
        >
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Município
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.city}
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Endereço
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.address}
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Número
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.number_address}
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Bairro
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.neighborhood}
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Referência
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.reference_address}
          </Text>
        </View>
        <Text {...css(this.props.styles.subtitle)}>Dados da vítima:</Text>
        <View
          {...css(this.props.styles.dataContainer)}
        >
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Nome da vítima
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.p[0].name_patient}
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Sexo do paciente
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.p[0].gender === 'M' ? 'Masculino' : 'Feminino'}
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Queixa da vítima
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.p[0].occurrence_patient.complaint_patient}
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            É uma emergência médica
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.emergency === 'Y' ? 'Sim' : 'Não'}
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Observação
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.comments}
          </Text>
        </View>
      </BottomView>
    )
  }
}

_Call.propTypes = {
  loadOccurrence: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  occurrence: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  updateOccurrenceStatus: PropTypes.func,
}

_Call.defaultProps = {
  loadOccurrence: () => {},
  updateOccurrenceStatus: () => {},
}

const mapStateToProps = state => ({
  occurrence: state.occurrence,
})

const mapActionToProps = {
  loadOccurrence,
  updateOccurrenceStatus,
}

const Call = connect(mapStateToProps, mapActionToProps)(_Call)

export default withStyles(({ color, fontFamily }) => ({
  container: {
    position: 'absolute',
    height,
    top: 0,
    width,
  },
  subtitle: {
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  dataContainer: {
    borderBottomWidth: 2,
    borderColor: color.grey,
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
  },
  dataLabel: {
    color: color.darkGrey,
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dataText: {
    color: color.darkGrey,
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 10,
  },
}))(Call)
