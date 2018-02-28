import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { RECEIVED_QUESTION_WITH_STEP } from '../constants'

export const fetchQuestionWithStep = (step, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_QUESTION'))
		try {
			const response = await fetch(`${url}/questions?step=${step}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
      const data = await response.json()
      await dispatch(receivedQuestionWithStep(data.data[0]))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_QUESTION'))
			await dispatch(setLoading(false, 'LOADING_FETCH_QUESTION'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_QUESTION', e))
			dispatch(setLoading(false, 'LOADING_FETCH_QUESTION'))
		}
	}
}

const receivedQuestionWithStep = (data) => ({
  type: RECEIVED_QUESTION_WITH_STEP,
  payload: data
})