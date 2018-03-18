import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { addPoint } from './points'
import { RECEIVED_PIPELINES, FETCH_PIPELINES_WITH_ID_CUSTOMER, FETCH_PIPELINES_WITH_BRANCH } from '../constants'

export const fetchPipelines = (id_branch, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_PIPELINES'))
		try {
			const response = await fetch(`${url}/pipelines?id_branch=${id_branch}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
      const data = await response.json()
      await dispatch(receivedPipelines(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_PIPELINES'))
			await dispatch(setLoading(false, 'LOADING_FETCH_PIPELINES'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_PIPELINES', e))
			dispatch(setLoading(false, 'LOADING_FETCH_PIPELINES'))
		}
	}
}

const receivedPipelines = (data) => ({
  type: RECEIVED_PIPELINES,
  payload: data
})

export const approvePipeline = (id_pipeline, id_branch, id_customer, id, step, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_APPROVE_PIPELINE'))
		try {
			await fetch(`${url}/pipelines/${id_pipeline}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({step: step+1, step_process: false})
			})
			await dispatch(fetchPipelines(id_branch, accessToken))
			if((step + 1) === 7) {
				await dispatch(addPoint({id_pipeline, id_branch, point: 20, id_customer, id}, accessToken))
			}else{
				await dispatch(addPoint({id_pipeline, id_branch, point: 5, id_customer, id}, accessToken))
			}
			await dispatch(setSuccess(true, 'SUCCESS_APPROVE_PIPELINE'))
			await dispatch(setLoading(false, 'LOADING_APPROVE_PIPELINE'))
			await dispatch(setSuccess(false, 'SUCCESS_APPROVE_PIPELINE'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_APPROVE_PIPELINE', e))
			dispatch(setLoading(false, 'LOADING_APPROVE_PIPELINE'))
		}
	}
}

export const fetchPipelinesWithIdCustomer = (id_customer, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_PIPELINES'))
		try {
			const response = await fetch(
				`${url}/pipelines?id_customer=${id_customer}&$sort[createdAt]=-1`,
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
			await dispatch(fetchPipelinesWithIdCustomerSuccess(data.data))
			await dispatch(setSuccess(false, 'FETCH_PIPELINES'))
			await dispatch(setLoading(false, 'FETCH_PIPELINES'))
		} catch (e) {
			await dispatch(setFailed(true, 'FETCH_PIPELINES', e))
			await dispatch(setLoading(false, 'FETCH_PIPELINES'))
		}
	}
}

export const fetchPipelinesWithIdCustomerSuccess = data => {
	return {
		type: FETCH_PIPELINES_WITH_ID_CUSTOMER,
		payload: data
	}
}

export const fetchPipelinesWithBranch = (id_branch, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_PIPELINES'))
		try {
			const response = await fetch(
				`${url}/pipelines?id_branch=${id_branch}&$sort[createdAt]=-1`,
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
			await dispatch(fetchPipelinesWithBranchSuccess(data.data))
			await dispatch(setSuccess(false, 'FETCH_PIPELINES'))
			await dispatch(setLoading(false, 'FETCH_PIPELINES'))
		} catch (e) {
			await dispatch(setFailed(true, 'FETCH_PIPELINES', e))
			await dispatch(setLoading(false, 'FETCH_PIPELINES'))
		}
	}
}

export const fetchPipelinesWithBranchSuccess = data => ({
	type: FETCH_PIPELINES_WITH_BRANCH,
	payload: data
})