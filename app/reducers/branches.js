import { RECEIVED_MY_BRANCH } from '../constants'

export const myBranch = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_MY_BRANCH:
			return action.payload
		default:
			return state
	}
}