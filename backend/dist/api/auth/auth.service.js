"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const db_1 = require("../../prisma/db");
const jwt_token_service_1 = require("../../services/jwt-token.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const transaction_util_1 = require("../../prisma/transaction.util");
exports.authService = {
    async loginUser(payload) {
        const user = await db_1.db.user.findUnique({ where: { email: payload.email } });
        if (!user)
            throw new Error('Invalid credentials, no user found');
        const match = bcrypt_1.default.compareSync(payload.password, user.password);
        if (!match)
            throw new Error('Invalid credentials');
        delete user.password;
        const token = await (0, jwt_token_service_1.generateJwtToken)({ fullname: user.fullname, id: user.id });
        return { token, user };
    },
    async getUser(payload) {
        const user = await db_1.db.user.findUnique({ where: { id: payload } });
        if (!user)
            throw new Error('Invalid - no user found');
        delete user.password;
        const token = await (0, jwt_token_service_1.generateJwtToken)({ fullname: user.fullname, id: user.id });
        return { token, user };
    },
    async registerUser(payload) {
        return (0, transaction_util_1.withTransaction)(async (tx) => {
            console.log('checking the env:', process.env.SALT_HASH);
            console.log('checking the payload:', payload);
            try {
                const user = await tx.user.create({
                    data: {
                        fullname: payload.fullname,
                        email: payload.email,
                        password: bcrypt_1.default.hashSync(payload.password, Number(process.env.SALT_HASH)),
                    },
                });
                delete user.password;
                const token = await (0, jwt_token_service_1.generateJwtToken)({ fullname: user.fullname, id: user.id });
                return { token, user };
            }
            catch (error) {
                console.log('The error is:', error);
                throw error;
            }
        });
    },
};
