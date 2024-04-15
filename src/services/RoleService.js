import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetRoles () {
  return ApiService.fetchData({
    url: `${URL_API}/v1/roles`,
    method: 'get'
  })
}

export async function apiCreateRole (data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/roles`,
    method: 'post',
    data
  })
}