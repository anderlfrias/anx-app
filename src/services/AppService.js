import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetApps () {
  return ApiService.fetchData({
    url: `${URL_API}/v1/apps`,
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

export async function apiDeleteApp (id) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/apps/${id}`,
    method: 'delete'
  })
}
