'use client'
import { setToken } from "./lib/axios"

export const isUserAuthenticated = () => {
  let token
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('@tokenStorage')
  }
  if (token) {
    setToken(token)
    return true
  }
  return false
}