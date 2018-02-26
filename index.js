import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import rootReducers from './app/reducers'

import Splash from './app/screens/Splash'
import Start from './app/screens/Start'
import Home from './app/screens/Home'
import Approval from './app/screens/Approval'

const store = createStore(rootReducers, applyMiddleware(thunk))

const AppNavigator = StackNavigator({
  Splash: {screen: Splash},
  Start: {screen: Start},
  Home: {screen: Home},
  Approval: {screen: Approval}
}, {
  headerMode: 'none'
})

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
)

AppRegistry.registerComponent('myForceManager', () => App)
