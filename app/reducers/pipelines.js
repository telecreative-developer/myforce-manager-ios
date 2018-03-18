import { RECEIVED_PIPELINES, FETCH_PIPELINES_WITH_ID_CUSTOMER, FETCH_PIPELINES_WITH_BRANCH } from '../constants'

export const pipelines = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_PIPELINES:
			return action.payload
		default:
			return state
	}
}

export const pipelinesWithIdCustomer = (state = [], action) => {
	switch (action.type) {
		case FETCH_PIPELINES_WITH_ID_CUSTOMER:
			return action.payload
		default:
			return state
	}
}

export const pipelinesWithBranch = (state = [], action) => {
	switch (action.type) {
		case FETCH_PIPELINES_WITH_BRANCH:
			return action.payload
		default:
			return state
	}
}