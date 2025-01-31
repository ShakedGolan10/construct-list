import { Router } from 'express'
import { loginUser, registerUser, logout } from './auth.controller'

const router = Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/logout', logout)

export default router
