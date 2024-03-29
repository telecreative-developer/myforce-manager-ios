import { combineReducers } from 'redux'
import { loading, success, failed, navigate, activePageHome } from './processor'
import { sessionPersistance } from './session'
import { myBranch } from './branches'
import { pipelines, pipelinesWithIdCustomer, pipelinesWithBranch } from './pipelines'
import { questionWithStep } from './questions'
import { answer, answers } from './answers'
import { sales } from './sales'
import { customers } from './customers'
import { pics, picsCustomers } from './pics'
import { teamUpdatesWithBranch } from './updates'
import { points } from './points'
import { target } from './targets'

const rootReducers = combineReducers({
	loading,
	success,
	failed,
	navigate,
	activePageHome,
	sessionPersistance,
	myBranch,
	pipelines,
	questionWithStep,
	answer,
	answers,
	sales,
	customers,
	pics,
	picsCustomers,
	pipelinesWithIdCustomer,
	teamUpdatesWithBranch,
	points,
	target,
	pipelinesWithBranch
})

export default rootReducers
