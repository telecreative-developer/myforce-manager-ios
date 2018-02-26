import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import rootReducers from './app/reducers'
import Reactotron from 'reactotron-react-native'
import './ReactotronConfig'

import Splash from './app/screens/Splash'
import Start from './app/screens/Start'
import Home from './app/screens/Home'
import Approval from './app/screens/Approval'
import Pipeline from './app/screens/Pipeline'
import CustomerList from './app/screens/CustomerList'

const store = Reactotron.createStore(rootReducers, applyMiddleware(thunk))

const AppNavigator = StackNavigator({
  Splash: {screen: Splash},
  Start: {screen: Start},
  Home: {screen: Home},
  Approval: {screen: Approval},
  Pipeline: {screen: Pipeline},
  CustomerList: {screen: CustomerList}
}, {
  headerMode: 'none'
})

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
)

AppRegistry.registerComponent('myForceManager', () => App)
