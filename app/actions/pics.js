import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { RECEIVED_PICS, PICS_CUSTOMERS } from '../constants'

export const fetchPics = (accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_PICS'))
		try {
			const response = await fetch(`${url}/pics`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
      const data = await response.json()
      await dispatch(receivedPics(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_PICS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_PICS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_PICS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_PICS'))
		}
	}
}

const receivedPics = (data) => ({
  type: RECEIVED_PICS,
  payload: data
})

export const fetchPicsWithIDCustomer = (id_customer, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_PICS_WITH_IDCUSTOMERS'))
		try {
			const response = await fetch(`${url}/pics?id_customer=${id_customer}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(fetchPicsWithIDCustomerSuccess(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_PICS_WITH_IDCUSTOMERS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_PICS_WITH_IDCUSTOMERS'))
		} catch (e) {
			await dispatch(
				setFailed(true, 'FAILED_FETCH_PICS_WITH_IDCUSTOMERS', 'Failed get data customers')
			)
			await dispatch(setLoading(false, 'LOADING_FETCH_PICS_WITH_IDCUSTOMERS'))
		}
	}
}

export const fetchPicsWithIDCustomerSuccess = (data) => ({
	type: PICS_CUSTOMERS,
	payload: data
})