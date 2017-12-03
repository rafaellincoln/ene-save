import React, {
  Component,
} from 'react'
import {
  View,
  ScrollView,
} from 'react-native'
import PropTypes from 'prop-types'

import {
  css,
  withStyles,
} from '../../styles/HackingTheFire'
import Tabs from './tabs'

class BottomView extends Component {
  constructor(props) {
    super(props)
    this.scrollTo = this.scrollTo.bind(this)
  }

  scrollTo() {
    if (this.props.scrollToTop) {
      this.scrollViewTo.scrollTo({ y: 0 })
    }
  }

  render() {
    return (
      <View {...css(this.props.styles.flex)}>
        <View {...css(this.props.styles.flex)}>
          <ScrollView
            ref={(ref) => { this.scrollViewTo = ref }}
            scrollEnabled={this.props.scrollEnabled}
            contentContainerStyle={this.props.contentContainerStyle}
            collapsable
            bounces={false}
          >
            {this.props.children}
          </ScrollView>
        </View>
        {this.scrollTo()}
        <Tabs
          navigation={this.props.navigation}
          actualRoute={this.props.navigation.state.routeName}
        />
      </View>
    )
  }
}

BottomView.propTypes = {
  styles: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  contentContainerStyle: PropTypes.object,
  scrollToTop: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
}

BottomView.defaultProps = {
  scrollToTop: false,
  scrollEnabled: true,
  contentContainerStyle: {},
}

export default withStyles(() => ({
  flex: {
    flex: 1,
  },
}))(BottomView)
