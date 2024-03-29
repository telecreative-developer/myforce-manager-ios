import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { saveSessionForLocal, saveSessionForPersistance } from './session'

export const login = (email, password) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'PROCESS_LOGIN'))
		try {
			const response = await fetch(`${url}/authentication`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password, strategy: 'local' })
			})
			const data = await response.json()
			if (data.code === 401 && data.name === 'NotAuthenticated') {
				await dispatch(setFailed(true, 'PROCESS_LOGIN', 'Email or password incorrect'))
				await dispatch(setLoading(false, 'PROCESS_LOGIN'))
			} else {
				await dispatch(setSuccess(true, 'PROCESS_LOGIN'))
				await dispatch(fetchUserWithEmail(email, password, data.accessToken))
			}
		} catch (e) {
			dispatch(setFailed(true, 'PROCESS_LOGIN', e))
			dispatch(setLoading(false, 'PROCESS_LOGIN'))
		}
	}
}

const fetchUserWithEmail = (email, password, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_MANAGER_WITH_EMAIL'))
		try {
			const response = await fetch(`${url}/managers?email=${email}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			const responseBranch = await fetch(`${url}/branches?id_manager=${data.data[0].id_manager}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const dataBranch = await responseBranch.json()
			await dispatch(saveSessionForLocal({ email, password, accessToken }))
			await dispatch(saveSessionForPersistance({ ...data.data[0], ...dataBranch.data[0], accessToken }))
			await dispatch(setSuccess(true, 'FETCH_MANAGER_WITH_EMAIL'))
			await dispatch(setLoading(false, 'FETCH_MANAGER_WITH_EMAIL'))
		} catch (e) {
			await dispatch(setFailed(true, 'FETCH_MANAGER_WITH_EMAIL', e))
			await dispatch(setLoading(false, 'FETCH_MANAGER_WITH_EMAIL'))
		}
	}
}
