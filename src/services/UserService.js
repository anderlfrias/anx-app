import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetUsers (q = '') {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users?${q}`,
    method: 'get'
  })
}

export async function apiCreateUser (data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users`,
    method: 'post',
    data
  })
}

export async function apiGetUserById (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${id}`,
    method: 'get'
  })
}

export async function apiUpdateUser (id, data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${id}`,
    method: 'put',
    data
  })
}

export async function apiDeleteUser (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${id}`,
    method: 'delete'
  })
}

export async function apiChangePassword (id, data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${id}/change-password`,
    method: 'put',
    data
  })
}

export async function apiResetPassword (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users/${id}/reset-password`,
    method: 'put'
  })
}