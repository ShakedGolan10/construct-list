import { Router } from 'express';
import { loginUser, registerUser, logout, getLoggedUser } from './auth.controller';

const router = Router();

router.post('/login', loginUser);
router.get('/', getLoggedUser);
router.post('/register', registerUser);
router.post('/logout', logout);

export default router;
