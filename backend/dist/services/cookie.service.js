"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.clearCookie = clearCookie;
function setCookie(res, name, data) {
    const halfAnHour = 30 * 60 * 1000;
    res.cookie(name, JSON.stringify(data), {
        expires: new Date(Date.now() + halfAnHour),
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
    });
}
function getCookie(req, name) {
    const cookie = req.cookies[name];
    if (cookie)
        return JSON.parse(cookie);
}
function clearCookie(res, name) {
    res.clearCookie(name, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
    });
}
