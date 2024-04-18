import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetApps (search = '') {
  return ApiService.fetchData({
    url: `${URL_API}/v1/apps?search=${search}`,
    method: 'get'
  })
}

export async function apiCreateApp (data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/apps`,
    method: 'post',
    data
  })
}

export async function apiGetAppById (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/apps/${id}`,
    method: 'get'
  })
}

export async function apiUpdateApp (id, data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/apps/${id}`,
    method: 'put',
    data
  })
}

export async function apiDeleteApp (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/apps/${id}`,
    method: 'delete'
  })
}
