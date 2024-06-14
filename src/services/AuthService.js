import { APP_CODE } from 'constants/app.constant'
import ApiService from './ApiService'
import { URL_API } from 'constants/api.constant'

export async function apiSignIn (data) {
  return ApiService.fetchData({
    url: `${URL_API}/v1/login`,
    method: 'post',
    data: { ...data, app: APP_CODE }
  })
}

export async function apiSignUp (data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data
    })
}

export async function apiSignOut (data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data
    })
}

export async function apiForgotPassword (data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data
    })
}

export async function apiResetPassword (data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data
    })
}
