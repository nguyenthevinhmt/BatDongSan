import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

import Cookies from 'js-cookie'
import { environment } from '../environment/environment'
import { LoginConfig } from './authConfig'
import { skipNullParams } from '../utils/common-helpers'
import { API_STATUS_CODE } from '../consts/api.code'
import { HTTP_STATUS_CODE } from '../consts/http'
import { ResponseLogin } from '../models/responseLogin'

let customHeader: any = {}

// const handleCaseError = (code: number) => {
//   const { authStore, menuStore } = store
//   menuStore.setLoading(false)

//   switch (code) {
//     case API_STATUS_CODE.LOCKED_ACCOUNT: {
//       authStore.setShowDialogUserLocked(true)
//       break
//     }
//   }
// }

export const setCustomHeaders = (data: any) => {
  customHeader = { ...customHeader, ...data }
}
// Create an Axios instance with a custom config
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

export const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get('refresh_token')

    const params: any = {
      grant_type: 'refresh_token',
      scope: LoginConfig.scope,
      client_id: LoginConfig.client_id,
      client_secret: LoginConfig.client_secret,
      refresh_token: refreshToken,
    }
    const body = Object.keys(params)
      .map((key: string) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&')

    const response: any = await axiosInstance({
      method: 'post',
      baseURL: environment.baseUrl,
      url: '/connect/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: body,
    })

    Cookies.set('refresh_token', response.refresh_token)

    const newAccessToken = response.access_token

    // Update the original request with the new access token
    return newAccessToken
  } catch (error) {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    window.location.href = '/login'
    // Handle token refresh failure (e.g., redirect to login page)
    console.error('Token refresh failed:', error)
    throw error
  }
}

// Add a request interceptor to attach the access token to each request
axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = Cookies.get('access_token')
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    }

    config.params = skipNullParams(config.params)
    Object.keys(customHeader).forEach((key) => {
      config.headers.set(key, customHeader[key])
    })
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for retrying original request after token refresh
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const statusCode = response?.data?.code

    // handleCaseError(statusCode)

    return response?.data
  },
  async (error) => {
    const statusCode = error?.response?.data?.code

    const originalRequest = error.config
    if (
      error.response &&
      error.response.status === HTTP_STATUS_CODE.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          // Call your token refresh endpoint, assuming you have one
          const newToken = await refreshAccessToken()
          // Update the token in the cookie
          Cookies.set('access_token', newToken)
          // Retry the original request with the new token
          refreshSubscribers.forEach((callback) => callback(newToken))
          refreshSubscribers = []
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      } else {
        // If token refresh is already in progress, wait for the token to be refreshed
        return new Promise((resolve) => {
          refreshSubscribers.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(axiosInstance(originalRequest))
          })
        })
      }
    }
    return Promise.reject(error)
  }
)

export default class BaseApi {
  protected request(config: AxiosRequestConfig) {
    return axiosInstance.request(config)
  }

  protected get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return axiosInstance.get(url, config)
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return axiosInstance.delete(url, config)
  }

  protected post<T>(url: string, data: object, config?: AxiosRequestConfig): AxiosPromise<T> {
    return axiosInstance.post(url, data, config)
  }

  protected put<T>(url: string, data: object = {}, config?: AxiosRequestConfig): AxiosPromise<T> {
    return axiosInstance.put(url, data, config)
  }

  protected patch<T>(url: string, data: object, config?: AxiosRequestConfig): AxiosPromise<T> {
    return axiosInstance.patch(url, data, config)
  }

  protected getBlob<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    const updatedConfig: AxiosRequestConfig = {
      ...config,
      responseType: 'blob',
    }

    return axiosInstance.get(url, updatedConfig)
  }
}
