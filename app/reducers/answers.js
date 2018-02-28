import { RECEIVED_ANSWER } from '../constants'

export const answer = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_ANSWER:
			return action.payload
		default:
			return state
	}
}