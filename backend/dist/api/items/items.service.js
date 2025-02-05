"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsService = void 0;
const db_1 = require("../../prisma/db");
exports.itemsService = {
    async createItem(payload, userId) {
        if (!userId)
            throw new Error('No user');
        return db_1.db.item.create({
            data: { ...payload, userId },
        });
    },
    async createItems(payload) {
        return db_1.db.item.createMany({
            ...payload,
        });
    },
    async updateItem(payload) {
        return db_1.db.item.update({
            where: { id: payload.id },
            data: { name: payload.name, category: payload.category },
        });
    },
    async deleteItem(id) {
        return db_1.db.item.delete({
            where: { id },
        });
    },
    async getItem(id) {
        return db_1.db.item.findUnique({
            where: { id },
        });
    },
    async getItems(userId) {
        return db_1.db.item.findMany({
            where: {
                userId: userId ? userId : '*',
            },
        });
    },
};
