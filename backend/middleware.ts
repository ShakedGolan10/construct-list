import { Request, Response, NextFunction } from 'express';
import { getCookie } from './services/cookie.service';
import { validateJwtToken } from './services/jwt-token.service';
import { User } from './types/general';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.url.includes('auth') && req.method === 'POST') next();
        const token = getCookie(req, 'accessToken');
        if (!token || typeof token !== 'string') res.status(401).json({ message: 'Unauthorized' });
        
        const user = await validateJwtToken<User>(token);
        req.user = user
        return next();
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
