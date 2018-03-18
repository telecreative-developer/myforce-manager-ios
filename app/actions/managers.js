import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { login } from './login'
import { saveSessionForPersistance } from './session'

export const updateManager = (id_manager, item, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'UPDATE_MANAGER'))
		try {
			const response = await fetch(`${url}/managers/${id_manager}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(item)
			})
			const data = await response.json()
			if (data.code === 400 && data.errors[0].path === 'username') {
				await dispatch(setFailed(true, 'UPDATE_MANAGER', 'Username already used'))
				await dispatch(setLoading(false, 'UPDATE_MANAGER'))
			} else if (data.code === 400 && data.errors[0].path === 'email') {
				await dispatch(setFailed(true, 'UPDATE_MANAGER', 'Email already used'))
				await dispatch(setLoading(false, 'UPDATE_MANAGER'))
			} else {
				await dispatch(setSuccess(true, 'UPDATE_MANAGER'))
				await dispatch(setLoading(false, 'UPDATE_MANAGER'))
			}
		} catch (e) {
			await dispatch(setFailed(true, 'UPDATE_MANAGER', e))
			await dispatch(setLoading(false, 'UPDATE_MANAGER'))
		}
	}
}

export const updatePassword = (id_manager, email, password, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_UPDATE_PASSWORD'))
		try {
			await fetch(`${url}/managers/${id_manager}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({password})
			})
			await dispatch(login(email, password))
			await dispatch(setSuccess(true, 'SUCCESS_UPDATE_PASSWORD'))
			await dispatch(setLoading(false, 'LOADING_UPDATE_PASSWORD'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_UPDATE_PASSWORD', e))
			await dispatch(setLoading(false, 'LOADING_UPDATE_PASSWORD'))
		}
	}
}

export const postAvatar = (id_manager, avatar, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_POST_AVATAR'))
		try {
			const responseUploadAvatar = await fetch(`${url}/upload-avatar-manager`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({ uri: avatar })
			})
			const dataUploadAvatar = await responseUploadAvatar.json()
			const responseManagers = await fetch(`${url}/managers/${id_manager}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({
					avatar: `${url}/files/managers/avatars/${dataUploadAvatar.id}`
				})
			})
			const dataManagers = await responseManagers.json()
			const responseManagerWithEmail = await fetch(
				`${url}/managers?email=${dataManagers.email}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: accessToken
					}
				}
			)
			const dataManagerWithEmail = await responseManagerWithEmail.json()
			await dispatch(
				saveSessionForPersistance({ ...dataManagerWithEmail.data[0], accessToken })
			)
			await dispatch(
				setSuccess(true, 'SUCCESS_POST_AVATAR', {
					...dataManagerWithEmail.data[0]
				})
			)
			await dispatch(setLoading(false, 'LOADING_POST_AVATAR'))
			await dispatch(setSuccess(false, 'SUCCESS_POST_AVATAR'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_POST_AVATAR', e))
			dispatch(setLoading(false, 'LOADING_POST_AVATAR'))
		}
	}
}

export const postCover = (id_manager, cover, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_POST_COVER'))
		try {
			const responseUploadCover = await fetch(`${url}/upload-cover-manager`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({ uri: cover })
			})
			const dataUploadCover = await responseUploadCover.json()
			const responseManagers = await fetch(`${url}/managers/${id_manager}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({
					cover: `${url}/files/managers/covers/${dataUploadCover.id}`
				})
			})
			const dataManagers = await responseManagers.json()
			const responseManagerWithEmail = await fetch(
				`${url}/managers?email=${dataManagers.email}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: accessToken
					}
				}
			)
			const dataManagerWithEmail = await responseManagerWithEmail.json()
			await dispatch(
				saveSessionForPersistance({ ...dataManagerWithEmail.data[0], accessToken })
			)
			await dispatch(
				setSuccess(true, 'SUCCESS_POST_COVER', {
					...dataManagerWithEmail.data[0]
				})
			)
			await dispatch(setLoading(false, 'LOADING_POST_COVER'))
			await dispatch(setSuccess(false, 'SUCCESS_POST_COVER'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_POST_COVER', e))
			dispatch(setLoading(false, 'LOADING_POST_COVER'))
		}
	}
}