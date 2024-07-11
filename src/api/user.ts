import { api, setToken } from "@/lib/axios"

type RegisterUserRequest = {
  name: string
  email: string
  password: string
}

type LoggedUserResponse = {
  data: {
    accessToken: string
  }
}

type LoginUserRequest = Omit<RegisterUserRequest, 'name'>

export async function registerUser(data: RegisterUserRequest): Promise<void> {
  await api.post('/signUp', data)
}

export async function loginUser(data: LoginUserRequest): Promise<void> {
  const httpResponse = await api.post<LoggedUserResponse>('/signIn', data)
  const token = httpResponse.data.data.accessToken
  localStorage.setItem('@tokenStorage', token)
  setToken(token)
}