import { URL_API } from 'constants/api.constant'
import ApiService from 'services/ApiService'

export async function apiGetLogs (q = '') {
  return ApiService.fetchData({
    url: `${URL_API}/v1/activity-log?${q}`,
    method: 'get'
  })
}