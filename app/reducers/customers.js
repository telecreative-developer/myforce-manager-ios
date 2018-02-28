import { RECEIVED_CUSTOMERS } from '../constants'

export const customers = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_CUSTOMERS:
			return action.payload
		default:
			return state
	}
}