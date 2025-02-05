"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
const prismaClientSingleton = () => {
    const prisma = new client_1.PrismaClient();
    return prisma;
};
exports.db = globalThis.prismaGlobal ?? prismaClientSingleton();
if (process.env.NODE_ENV !== 'production')
    globalThis.prismaGlobal = exports.db;
