import { setToken } from "./lib/axios"

export const isUserAuthenticated = () => {
  const token = localStorage.getItem('@tokenStorage')
  if (token) {
    setToken(token)
    return true
  }
  return false
}