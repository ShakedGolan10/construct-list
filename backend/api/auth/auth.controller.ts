import { Response } from 'express'
import { loginUserService, registerUserService } from './auth.service'
import { CreateUserReq, LoginReq } from './auth.types.js'

export async function loginUser(req: LoginReq, res: Response) {
  try {
    const token = await loginUserService(req.body)
    res.json({ token })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

export async function registerUser(req: CreateUserReq, res: Response) {
  try {
    const newUser = await registerUserService(req.body)
    res.json({ user: newUser })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}
