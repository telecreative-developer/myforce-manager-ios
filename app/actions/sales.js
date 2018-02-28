import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { RECEIVED_SALES } from '../constants'

export const fetchSales = (id_branch, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_SALES'))
		try {
			const response = await fetch(`${url}/users?id_branch=${id_branch}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
      const data = await response.json()
      await dispatch(receivedSales(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_SALES'))
			await dispatch(setLoading(false, 'LOADING_FETCH_SALES'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_SALES', e))
			dispatch(setLoading(false, 'LOADING_FETCH_SALES'))
		}
	}
}

const receivedSales = (data) => ({
  type: RECEIVED_SALES,
  payload: data
})