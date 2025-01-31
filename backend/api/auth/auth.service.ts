import { db } from '../../prisma/db.js'
import { generateJwtToken } from '../../services/jwt-token.service.js'
import bcrypt from 'bcryptjs'
import { CreateUserPayload, LoginPayload } from './auth.types.js'

export async function loginUserService(payload: LoginPayload) {
  const user = await db.user.findUnique({ where: { email: payload.email } })
  if (!user) throw new Error('Invalid credentials')

  const match = await bcrypt.compare(payload.password, user.password)
  if (!match) throw new Error('Invalid credentials')

  const token = generateJwtToken({fullname: user.fullname, id: user.id})
  return token
}

export async function registerUserService(payload: CreateUserPayload) {
    const {fullname, email, password} = payload
  const user = await db.user.create({
    data: {
        fullname,
        email,
        password
    }
  })
  return user
}
