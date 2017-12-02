import React from 'react'
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import { withStyles } from '../styles/HackingTheFire'
import Card from '../ui/Card'

const Home = props => (
  <View>
    <Text style={props.styles.subtitle}>Status dos atendimentos AO VIVO:</Text>
    <FlatList
      bounces={false}
      data={[
        {
          title: 'Atendimentos em aberto',
          color: props.theme.color.red,
          value: 5,
          total: 20,
          key: String(Math.random()),
        },
        {
          title: 'Atendimentos a caminho',
          color: props.theme.color.lightOrange,
          value: 3,
          total: 20,
          key: String(Math.random()),
        },
        {
          title: 'Atendimentos em andamento',
          color: props.theme.color.blue,
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
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('call')
      }}
    >
      <Text>Chamado</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('medicalEmergency')
      }}
    >
      <Text>Emergência médica</Text>
    </TouchableOpacity>
  </View>
)

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(() => ({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
}))(Home)
