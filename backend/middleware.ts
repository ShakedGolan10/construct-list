import { Request, Response, NextFunction } from 'express';
import { getCookie } from './services/cookie.service.js';
import { validateJwtToken } from './services/jwt-token.service.js';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.url.includes('auth') && req.method === 'POST') next();
        
        const token = getCookie(req, 'accessToken');
        if (!token || typeof token !== 'string') res.status(401).json({ message: 'Unauthorized' });
        
        const user = await validateJwtToken(token);
        res.setHeader('user', JSON.stringify(user));
        return next();
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
