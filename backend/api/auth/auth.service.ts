import { db } from '../../prisma/db'
import { generateJwtToken } from '../../services/jwt-token.service'
import bcrypt from 'bcrypt'
import { CreateUserPayload, LoginPayload } from './auth.types'
import { withTransaction } from '../../prisma/transaction.util'

export const authService = {

  async loginUser(payload: LoginPayload) {
    const user = await db.user.findUnique({ where: { email: payload.email } })
    if (!user) throw new Error('Invalid credentials, no user found')

    const match = bcrypt.compareSync(payload.password, user.password)
    if (!match) throw new Error('Invalid credentials')

    delete user.password
    const token = await generateJwtToken({ fullname: user.fullname, id: user.id })
    return { token, user }
  },
  async registerUser(payload: CreateUserPayload) {
    return withTransaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullname: payload.fullname,
          email: payload.email,
          password: bcrypt.hashSync(payload.password, Number(process.env.SALT_HASH))
        }
      })
      delete user.password
      const token = await generateJwtToken({ fullname: user.fullname, id: user.id })
      return { token, user }
    })
  }
}
