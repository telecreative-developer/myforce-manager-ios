import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { RECEIVED_ANSWER } from '../constants'

export const fetchAnswer = (id, id_pipeline, id_customer, step, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_QUESTION'))
		try {
			const response = await fetch(`${url}/answers?id=${id}&id_pipeline=${id_pipeline}&step=${step}&id_customer=${id_customer}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
      const data = await response.json()
      await dispatch(receivedAnswer(data.data[0]))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_QUESTION'))
			await dispatch(setLoading(false, 'LOADING_FETCH_QUESTION'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_QUESTION', e))
			dispatch(setLoading(false, 'LOADING_FETCH_QUESTION'))
		}
	}
}

const receivedAnswer = (data) => ({
  type: RECEIVED_ANSWER,
  payload: data
})