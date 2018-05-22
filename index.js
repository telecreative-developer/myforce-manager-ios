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
import CustomerProfile from './app/screens/CustomerProfile'
import Profile from './app/screens/Profile'
import SalesProfile from './app/screens/SalesProfile'
import Settings from './app/screens/Settings'
import EditProfile from './app/screens/EditProfile'
import ChangePassword from './app/screens/ChangePassword'
import History from './app/screens/History'

const store = Reactotron.createStore(rootReducers, applyMiddleware(thunk))

const AppNavigator = StackNavigator(
  {
    Splash: { screen: Splash },
    Start: { screen: Start },
    Home: { screen: Home },
    Approval: { screen: Approval },
    Pipeline: { screen: Pipeline },
    CustomerList: { screen: CustomerList },
    CustomerProfile: { screen: CustomerProfile },
    Profile: { screen: Profile },
    SalesProfile: { screen: SalesProfile },
    Settings: { screen: Settings },
    EditProfile: { screen: EditProfile },
    ChangePassword: { screen: ChangePassword },
    History: { screen: History }
  },
  {
    headerMode: 'none'
  }
)

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
)

AppRegistry.registerComponent('myForceManager', () => App)
