import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetUsersAccess () {
  return ApiService.fetchData({
    url: `${URL_API}/v1/app-access-flow`,
    method: 'get'
  })
}

export async function apiLockoutUserAccess (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/app-access-flow/${id}/lockout`,
    method: 'put'
  })
}

export async function apiUnlockUserAccess (id, data={}) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/app-access-flow/${id}/unlock`,
    method: 'put',
    data
  })
}