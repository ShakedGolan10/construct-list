import { Request, Response } from 'express';

export function setCookie(res: Response, name: string, data: any): void {
        const halfAnHour = 30 * 60 * 1000; 
        res.cookie(name, JSON.stringify(data), { 
            expires: new Date(Date.now() + halfAnHour),
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true, 
            sameSite: 'strict' 
        });
};

export function getCookie(req: Request, name: string): string  {
        const cookie = req.cookies[name];
        if (cookie) return JSON.parse(cookie);
};

export function clearCookie(res: Response, name: string) {
        res.clearCookie(name, { 
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true, 
            sameSite: 'strict' 
        });
};
