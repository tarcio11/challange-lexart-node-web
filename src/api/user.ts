import { api } from "@/lib/axios"

type RegisterUserRequest = {
  name: string
  email: string
  password: string
}

type LoginUserRequest = Omit<RegisterUserRequest, 'name'>

export async function registerUser(data: RegisterUserRequest): Promise<void> {
  await api.post('/signUp', data)
}

export async function loginUser(data: LoginUserRequest): Promise<void> {
  await api.post('/signIn', data)
}