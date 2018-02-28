import { RECEIVED_PICS, PICS_CUSTOMERS } from '../constants'

export const pics = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_PICS:
			return action.payload
		default:
			return state
	}
}

export const picsCustomers = (state = [], action) => {
	switch (action.type) {
		case PICS_CUSTOMERS:
			return action.payload
		default:
			return state
	}
}