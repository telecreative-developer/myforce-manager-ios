import React from 'react'
import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Home from './app/screens/Home'
import Approval from './app/screens/Approval'

const App = StackNavigator({
  Home: {screen: Home},
  Approval: {screen: Approval}
}, {
  headerMode: 'none'
})

AppRegistry.registerComponent('myForceManager', () => App)
