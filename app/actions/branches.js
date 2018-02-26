import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { RECEIVED_MY_BRANCH } from '../constants'

export const fetchMyBranch = (id_manager, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_MY_BRANCH'))
		try {
			const response = await fetch(`${url}/branches?id_manager=${id_manager}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
      const data = await response.json()
      await dispatch(receivedMyBranch(data.data[0]))
			await dispatch(setSuccess(true, 'FETCH_MY_BRANCH'))
			await dispatch(setLoading(false, 'FETCH_MY_BRANCH'))
		} catch (e) {
			dispatch(setFailed(true, 'FETCH_MY_BRANCH', e))
			dispatch(setLoading(false, 'FETCH_MY_BRANCH'))
		}
	}
}

const receivedMyBranch = (data) => ({
  type: RECEIVED_MY_BRANCH,
  payload: data
})