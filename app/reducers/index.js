import { combineReducers } from 'redux'
import { loading, success, failed, navigate, activePageHome } from './processor'
import { sessionPersistance } from './session'
import { myBranch } from './branches'

const rootReducers = combineReducers({
  loading, success, failed, navigate, activePageHome,
  sessionPersistance, myBranch
})

export default rootReducers