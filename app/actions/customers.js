import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { RECEIVED_CUSTOMERS } from '../constants'

export const fetchCustomers = (id_branch, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_CUSTOMERS'))
		try {
			const response = await fetch(`${url}/customers?id_branch=${id_branch}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
      const data = await response.json()
      await dispatch(receivedCustomers(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_CUSTOMERS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_CUSTOMERS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_CUSTOMERS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_CUSTOMERS'))
		}
	}
}

const receivedCustomers = (data) => ({
  type: RECEIVED_CUSTOMERS,
  payload: data
})