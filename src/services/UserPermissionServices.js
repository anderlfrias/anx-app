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

export async function apiGetUserPermissions (userId) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${userId}/permissions`,
    method: 'get'
  })
}

// /api/v1/users/:userId/apps/:appId/roles/:roleId/restrictions
export async function apiPostRestrictionToUserInApp (userId, appId, roleId, data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${userId}/apps/${appId}/roles/${roleId}/restrictions`,
    method: 'post',
    data
  })
}

export async function apiDeleteRestrictionOfUserInApp (userId, appId, roleId, restrictionId) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${userId}/apps/${appId}/roles/${roleId}/restrictions/${restrictionId}`,
    method: 'delete'
  })
}
