"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const cookie_service_1 = require("./services/cookie.service");
const jwt_token_service_1 = require("./services/jwt-token.service");
async function authMiddleware(req, res, next) {
    try {
        if (req.url.includes('auth') && req.method === 'POST')
            return next();
        const token = (0, cookie_service_1.getCookie)(req, 'accessToken');
        if (!token || typeof token !== 'string')
            return res.status(401).json({ message: 'Unauthorized' });
        const user = await (0, jwt_token_service_1.validateJwtToken)(token);
        req.user = user;
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
