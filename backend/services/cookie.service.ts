import { Request, Response } from 'express';

export function setCookie(res: Response, name: string, data: any): void {
    try {
        const halfAnHour = 30 * 60 * 1000; 
        res.cookie(name, JSON.stringify(data), { 
            expires: new Date(Date.now() + halfAnHour),
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true, 
            sameSite: 'strict' 
        });
    } catch (error) {
        console.error(error);
        throw new Error("cookie-service: Couldn't set cookie");
    }
};

export function getCookie(req: Request, name: string): string | boolean {
    try {
        const cookie = req.cookies[name];
        if (cookie) {
            return JSON.parse(cookie);
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        throw new Error("cookie-service: Couldn't get cookie");
    }
};

export function clearCookie(res: Response, name: string): void{
    try {
        res.clearCookie(name, { 
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true, 
            sameSite: 'strict' 
        });
    } catch (error) {
        console.error(error);
        throw new Error("cookie-service: Couldn't clear cookie");
    }
};
