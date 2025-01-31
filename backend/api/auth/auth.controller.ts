import { Response, Request } from 'express'
import { CreateUserReq, LoginReq } from './auth.types'
import { authService } from './auth.service'
import { clearCookie, setCookie } from '../../services/cookie.service'

export async function loginUser(req: LoginReq, res: Response) {
  try {
    const { token, user } = await authService.loginUserService(req.body)
    setCookie(res, 'accessToken', token)
    res.status(200).json({ user })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

export async function logout(req: Request, res: Response) {
  try {
    clearCookie(res, 'accessToken')
    res.status(200).json('loggedOut')
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

export async function registerUser(req: CreateUserReq, res: Response) {
  try {
    const { token, user } = await authService.registerUserService(req.body)
    setCookie(res,'accessToken', token)
    res.status(200).json({ user })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}
