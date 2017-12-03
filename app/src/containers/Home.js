import React, {
  PureComponent,
} from 'react'
import {
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import {
  connect,
} from 'react-redux'
import PropTypes from 'prop-types'
import { css, withStyles } from '../styles/HackingTheFire'
import Card from '../ui/Card'

const { width } = Dimensions.get('window')

class _Home extends PureComponent {
  renderCallButton() {
    if (!this.props.occurrence.idOccurrence) return null
    return (
      <TouchableOpacity
        {...css(this.props.styles.callButton)}
        onPress={() => {
          this.props.navigation.navigate('call')
        }}
      >
        <Text {...css(this.props.styles.callButtonInner)}>Acessar chamado</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        {this.renderCallButton()}
        <Text style={this.props.styles.subtitle}>Status dos atendimentos AO VIVO:</Text>
        <FlatList
          bounces={false}
          data={[
            {
              title: 'Atendimentos em aberto',
              color: this.props.theme.color.red,
              value: 5,
              total: 20,
              key: String(Math.random()),
            },
            {
              title: 'Atendimentos a caminho',
              color: this.props.theme.color.lightOrange,
              value: 3,
              total: 20,
              key: String(Math.random()),
            },
            {
              title: 'Atendimentos em andamento',
              color: this.props.theme.color.blue,
              value: 12,
              total: 20,
              key: String(Math.random()),
            },
          ]}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              color={item.color}
              value={item.value}
              total={item.total}
            />
          )}
        />
      </View>
    )
  }
}

_Home.propTypes = {
  navigation: PropTypes.object.isRequired,
  occurrence: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  occurrence: state.occurrence,
})

const Home = connect(mapStateToProps)(_Home)

export default withStyles(({ color }) => ({
  callButton: {
    backgroundColor: color.blue,
    borderRadius: 8,
    elevation: 10,
    marginHorizontal: (width * 0.1) / 2,
    marginVertical: 20,
    padding: 15,
    shadowColor: color.black,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    width: width * 0.9,
  },
  callButtonInner: {
    color: color.white,
    fontSize: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
}))(Home)
