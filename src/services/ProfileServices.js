import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetAppsOfUser () {
  return ApiService.fetchData({
    url: `${URL_API}/v1/profile/apps`,
    method: 'get'
  })
}

export async function apiGetAccessOfUser () {
  return ApiService.fetchData({
    url: `${URL_API}/v1/profile/access`,
    method: 'get'
  })
}

export async function apiChangeMyPassword (data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/profile/change-password`,
    method: 'put',
    data
  })
}

export async function apiUpdateProfilePicture (data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/profile/picture`,
    method: 'put',
    data
  })
}

export async function apiGetProfilePicture () {
  return ApiService.fetchData({
    url: `${URL_API}/v1/profile/picture`,
    method: 'get'
  })
}
