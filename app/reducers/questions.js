import { RECEIVED_QUESTION_WITH_STEP } from '../constants'

export const questionWithStep = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_QUESTION_WITH_STEP:
			return action.payload
		default:
			return state
	}
}