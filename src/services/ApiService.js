import axios from 'axios'
import { REQUEST_HEADER_AUTH_KEY } from 'constants/api.constant'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'

export const getToken = () => {
  const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
  const persistData = deepParseJson(rawPersistData)

  return persistData?.auth?.session?.token || null
}

const ApiService = {
  fetchData (param) {
    const accessToken = getToken()
    const headers = param.headers ? param.headers : accessToken ? { [REQUEST_HEADER_AUTH_KEY]: accessToken } : {}
    return axios({
      ...param,
      headers
    })
  }
}

export default ApiService
