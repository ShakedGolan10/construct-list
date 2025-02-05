"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
exports.getLoggedUser = getLoggedUser;
exports.logout = logout;
exports.registerUser = registerUser;
const auth_service_1 = require("./auth.service");
const cookie_service_1 = require("../../services/cookie.service");
async function loginUser(req, res) {
    try {
        const { token, user } = await auth_service_1.authService.loginUser(req.body);
        (0, cookie_service_1.setCookie)(res, 'accessToken', token);
        res.status(200).json({ ...user });
    }
    catch (err) {
        console.log({ err });
        res.status(400).json({ error: err });
    }
}
async function getLoggedUser(req, res) {
    try {
        const { token, user } = await auth_service_1.authService.getUser(req.user.id);
        (0, cookie_service_1.setCookie)(res, 'accessToken', token);
        res.status(200).json({ ...user });
    }
    catch (err) {
        console.log({ err });
        res.status(400).json({ error: err });
    }
}
async function logout(req, res) {
    try {
        (0, cookie_service_1.clearCookie)(res, 'accessToken');
        res.status(200).json('loggedOut');
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}
async function registerUser(req, res) {
    try {
        const { token, user } = await auth_service_1.authService.registerUser(req.body);
        (0, cookie_service_1.setCookie)(res, 'accessToken', token);
        res.status(200).json({ ...user });
    }
    catch (err) {
        console.log({ err });
        res.status(400).json({ error: err });
    }
}
