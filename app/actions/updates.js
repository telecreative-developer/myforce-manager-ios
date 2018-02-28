import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { FETCH_TEAM_UPDATES_WITH_BRANCH_SUCCESS } from '../constants'

export const fetchTeamUpdatesWithBranch = (id_branch, accessToken) => {
  return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_TEAM_UPDATES_WITH_BRANCH'))
		try {
			const response = await fetch(
				`${url}/team-updates?id_branch=${id_branch}`,
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
			await dispatch(fetchTeamUpdatesWithBranchSuccess(data.data))
			await dispatch(setSuccess(false, 'SUCCESS_FETCH_TEAM_UPDATES_WITH_BRANCH'))
			await dispatch(setLoading(false, 'LOADING_FETCH_TEAM_UPDATES_WITH_BRANCH'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_TEAM_UPDATES_WITH_BRANCH', e))
			dispatch(setLoading(false, 'LOADING_FETCH_TEAM_UPDATES_WITH_BRANCH'))
		}
	}
}

export const fetchTeamUpdatesWithBranchSuccess = (data) => ({
  type: FETCH_TEAM_UPDATES_WITH_BRANCH_SUCCESS,
  payload: data
})