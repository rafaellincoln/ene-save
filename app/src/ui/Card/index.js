import React, {
  Component,
} from 'react'
import {
  Animated,
  Dimensions,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import {
  css,
  withStyles,
} from '../../styles/HackingTheFire'

const { width } = Dimensions.get('window')

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(this.state.anim, {
      toValue: 1,
      duration: 1000,
    }).start()
  }

  render() {
    const progressWidth = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', `${(this.props.value / this.props.total) * 100}%`],
    })

    return (
      <View {...css(this.props.styles.container)}>
        <View {...css(this.props.styles.textsContainer)}>
          <Text {...css(this.props.styles.title)}>{this.props.title}</Text>
          <Text {...css(this.props.styles.value)}>{this.props.value}</Text>
        </View>
        <View {...css(this.props.styles.progressContainer)}>
          <Animated.View
            {...css(
              this.props.styles.progress,
              {
                backgroundColor: this.props.color,
                width: progressWidth,
              },
            )}
          />
        </View>
      </View>
    )
  }
}

Card.propTypes = {
  styles: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

export default withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
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
  textsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: width < 360 ? 14 : 18,
  },
  value: {
    fontSize: width < 360 ? 38 : 46,
    fontWeight: 'bold',
  },
  progressContainer: {
    backgroundColor: color.white,
    bottom: 15,
    borderRadius: 7.5,
    elevation: 5,
    left: 15,
    height: 15,
    position: 'absolute',
    shadowOffset: {
      width: 1.5,
      height: 1.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    width: '75%',
  },
  progress: {
    borderRadius: 7.5,
    height: 15,
  },
}))(Card)
