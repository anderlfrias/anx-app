import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiPostAppToUser (userId, data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${userId}/apps`,
    method: 'post',
    data
  })
}

export async function apiDeleteAppOfUser (userId, appId) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${userId}/apps/${appId}`,
    method: 'delete'
  })
}

export async function apiGetRolesByUserIdAndAppId (userId, appId) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${userId}/apps/${appId}/roles`,
    method: 'get'
  })
}

export async function apiPostRoleToUserInApp (userId, appId, data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${userId}/apps/${appId}/roles`,
    method: 'post',
    data
  })
}

export async function apiDeleteRoleOfUserInApp (userId, appId, roleId) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${userId}/apps/${appId}/roles/${roleId}`,
    method: 'delete'
  })
}