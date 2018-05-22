import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { RECEIVED_ANSWER, RECEIVED_ANSWERS } from '../constants'

export const fetchAnswers = (id, id_pipeline, id_customer, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_ANSWERS'))
		try {
			const response = await fetch(
				`${url}/answers?id=${id}&id_pipeline=${id_pipeline}&id_customer=${id_customer}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: accessToken
					}
				}
			)
			const data = await response.json()
			await dispatch(receivedAnswers(data.data[0]))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_ANSWERS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_ANSWERS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_ANSWERS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_ANSWERS'))
		}
	}
}

const receivedAnswers = data => ({
	type: RECEIVED_ANSWERS,
	payload: data
})

export const fetchAnswer = (id, id_pipeline, id_customer, step, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_ANSWER'))
		try {
			const response = await fetch(
				`${url}/answers?id=${id}&id_pipeline=${id_pipeline}&step=${step}&id_customer=${id_customer}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: accessToken
					}
				}
			)
			const data = await response.json()
			await dispatch(receivedAnswer(data.data[0]))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_ANSWER'))
			await dispatch(setLoading(false, 'LOADING_FETCH_ANSWER'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_ANSWER', e))
			dispatch(setLoading(false, 'LOADING_FETCH_ANSWER'))
		}
	}
}

const receivedAnswer = data => ({
	type: RECEIVED_ANSWER,
	payload: data
})
