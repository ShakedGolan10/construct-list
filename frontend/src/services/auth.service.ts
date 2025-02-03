import { LoginCreds, RegisterCreds, User } from "../types/app-types"
import { httpService } from "./axios.service"

export const isLoggedIn = async (): Promise<User> => {
   const user = await httpService.get<User>('auth')
   return user
}

export const login = async (creds: LoginCreds): Promise<User> => {
   const user = await httpService.post<User>('auth/login', creds)
   if (!user) throw new Error('Couldnt login')
   return user
}
export const register = async (creds: RegisterCreds): Promise<User> => {
   const user = await httpService.post<User>('auth/register', creds)
   if (!user) throw new Error('Couldnt register')
   return user
}

export const logout = async (): Promise<void> => {
    try {
        await httpService.post<User>('auth/logout')
    } catch (error) {
        return 
    }
   
}
