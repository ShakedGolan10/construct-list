import { Request, Response, NextFunction } from 'express'
import { getCookie } from './services/cookie.service'
import { validateJwtToken } from './services/jwt-token.service'
import { User } from './types/general'

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (process.env.NODE_ENV !== 'production') 
      return next()
    if (req.url.includes('auth') && req.method === 'POST') 
      return next()
    const token = getCookie(req, 'accessToken')
    if (!token || typeof token !== 'string') 
      return res.status(401).json({ message: 'Unauthorized' })
    const user = await validateJwtToken<User>(token)
    req.user = user
    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
