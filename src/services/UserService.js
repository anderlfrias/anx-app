import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetUsers () {
  return ApiService.fetchData({
    url: `${URL_API}/v1/users`,
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
