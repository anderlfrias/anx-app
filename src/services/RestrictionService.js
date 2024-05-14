import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetRestrictions (q = '') {
  return ApiService.fetchData({
    url: `${URL_API}/v1/restrictions?${q}`,
    method: 'get'
  })
}

export async function apiGetRestrictionById (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/restrictions/${id}`,
    method: 'get'
  })
}

export async function apiGetRestrictionsByAppIdAndRoleId (appId, roleId) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/restrictions/app/${appId}/role/${roleId}`,
    method: 'get'
  })
}

export async function apiCreateRestriction (data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/restrictions`,
    method: 'post',
    data
  })
}

export async function apiUpdateRestriction (id, data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/restrictions/${id}`,
    method: 'put',
    data
  })
}

export async function apiDeleteRestriction (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/restrictions/${id}`,
    method: 'delete'
  })
}
