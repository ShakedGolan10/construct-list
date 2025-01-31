import { db } from '../../prisma/db'
import { generateJwtToken } from '../../services/jwt-token.service'
import bcrypt from 'bcryptjs'
import { CreateUserPayload, LoginPayload } from './auth.types'

export const authService = {

async loginUserService(payload: LoginPayload) {
  const user = await db.user.findUnique({ where: { email: payload.email } })
  if (!user) throw new Error('Invalid credentials')

  const match = await bcrypt.compare(payload.password, user.password)
  if (!match) throw new Error('Invalid credentials')

  const token = generateJwtToken({fullname: user.fullname, id: user.id})
  return {token, user}
},

async registerUserService(payload: CreateUserPayload) {
    const {fullname, email, password} = payload
  const user = await db.user.create({
    data: {
        fullname,
        email,
        password
    }
  })
  const token = generateJwtToken({fullname: user.fullname, id: user.id})
  return {token, user}
}
}
