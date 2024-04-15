import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetApps () {
  return ApiService.fetchData({
    url: `${URL_API}/v1/apps`,
    method: 'get'
  })
}
