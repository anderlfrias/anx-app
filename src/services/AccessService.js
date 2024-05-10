import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetUsersAccess () {
  return ApiService.fetchData({
    url: `${URL_API}/v1/app-access-flow`,
    method: 'get'
  })
}