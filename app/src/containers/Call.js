import React, {
  Component,
} from 'react'
import {
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { css, withStyles } from '../styles/HackingTheFire'
import BottomView from '../ui/BottomView'
import StatusCard from '../ui/StatusCard'

class Call extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ola: 'hello',
    }
  }

  log = (text) => {
    console.log(text)
  }

  render() {
    return (
      <BottomView navigation={this.props.navigation}>
        <Text {...css(this.props.styles.subtitle)}>Status da ocorrência:</Text>
        <StatusCard
          title="Despacho"
          statusCode={2}
          onPress={() => this.log('andamento init')}
        />
        <StatusCard
          title="Em andamento"
          statusCode={3}
          timeLeft={33}
          onPress={() => this.log('atendimento init')}
        />
        <StatusCard
          title="Em atendimento"
          statusCode={4}
          timeSpent={10}
          onPressCheckout={() => this.log('checkout init')}
          onPressEmergency={() => this.log('emergencia init')}
        />
        <StatusCard
          title="Finalizado"
          statusCode={5}
        />
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
            Valterson Balduíno Romes Filho
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Telefone
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            (34) 9 9123-4567
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
            Uberlândia
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Endereço
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            Av. Estrela do Sul
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Número
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            1573
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Bairro
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            Oswaldo Rezende
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Referência
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            Próxima a Raulino Cota Pacheco
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
            André Luiz Campos Afonso do Vale
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Sexo do paciente
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            Masculino
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Queixa da vítima
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id
            libero a risus hendrerit bibendum sed sed sapien. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Cras est diam, ornare feugiat nulla et, molestie luctus
            leo. Nunc quis semper tortor, nec fermentum tellus. Curabitur
            convallis orci condimentum lacus molestie, sit amet malesuada
            ligula ultricies. Integer lacinia dolor non velit feugiat, in
            ultrices nisi venenatis. Suspendisse in purus mollis, scelerisque
            nisi non, euismod odio. Etiam tempor nec est sit amet vehicula.
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            É uma emergência médica
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            Não
          </Text>
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Observação
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id
            libero a risus hendrerit bibendum sed sed sapien. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Cras est diam, ornare feugiat nulla et, molestie luctus
            leo. Nunc quis semper tortor, nec fermentum tellus. Curabitur
            convallis orci condimentum lacus molestie, sit amet malesuada
            ligula ultricies. Integer lacinia dolor non velit feugiat, in
            ultrices nisi venenatis. Suspendisse in purus mollis, scelerisque
            nisi non, euismod odio. Etiam tempor nec est sit amet vehicula.
          </Text>
        </View>
      </BottomView>
    )
  }
}

Call.propTypes = {
  navigation: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
}

export default withStyles(({ color }) => ({
  subtitle: {
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dataText: {
    color: color.darkGrey,
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 10,
  },
}))(Call)
