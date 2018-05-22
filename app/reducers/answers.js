import { RECEIVED_ANSWER, RECEIVED_ANSWERS } from '../constants'

export const answer = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_ANSWER:
			return action.payload
		default:
			return state
	}
}

export const answers = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_ANSWERS:
			return action.payload
		default:
			return state
	}
}
