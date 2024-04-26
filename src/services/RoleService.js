import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetRoles (search = '') {
  return ApiService.fetchData({
    url: `${URL_API}/v1/roles?search=${search}`,
    method: 'get'
  })
}

export async function apiGetRoleById (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/roles/${id}`,
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

export async function apiGetRolesByAppId (appId) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/roles/app/${appId}`,
    method: 'get'
  })
}

export async function apiUpdateRole (data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/roles/${data.id}`,
    method: 'put',
    data
  })
}

export async function apiDeleteRole (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/roles/${id}`,
    method: 'delete'
  })
}
