import { RECEIVED_SALES } from '../constants'

export const sales = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_SALES:
			return action.payload
		default:
			return state
	}
}