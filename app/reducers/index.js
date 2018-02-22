import { combineReducers } from 'redux'
import { loading, success, failed, navigate, activePageHome } from './processor'
import { sessionPersistance } from './session'

const rootReducers = combineReducers({
  loading, success, failed, navigate, activePageHome,
  sessionPersistance
})

export default rootReducers