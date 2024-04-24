import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiPostUserPermission (data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users-permissions`,
    method: 'post',
    data
  })
}

export async function apiDeleteUserPermission (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users-permissions/${id}`,
    method: 'delete',
  })
}

export async function apiDeleteUserPermissionByUserAndApp (userId, appId) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users-permissions/user/${userId}/app/${appId}`,
    method: 'delete',
  })
}