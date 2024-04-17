import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetPermissions () {
  return ApiService.fetchData({
    url: `${URL_API}/v1/permissions`,
    method: 'get'
  })
}

export async function apiGetPermissionById (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/permissions/${id}`,
    method: 'get'
  })
}

export async function apiCreatePermission (data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/permissions`,
    method: 'post',
    data
  })
}

export async function apiUpdatePermission (data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/permissions/${data.id}`,
    method: 'put',
    data
  })
}

export async function apiDeletePermission (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/permissions/${id}`,
    method: 'delete'
  })
}
