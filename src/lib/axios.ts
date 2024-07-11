import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const setToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 403 || error.response?.data?.error === 'Access denied') {
        localStorage.removeItem('@tokenStorage')
      }
      return Promise.reject(error)
    }
  )
}
