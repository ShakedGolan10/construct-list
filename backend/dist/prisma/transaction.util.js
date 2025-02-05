"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTransaction = withTransaction;
const db_1 = require("./db");
async function withTransaction(operation) {
    try {
        return await db_1.db.$transaction(async (txClient) => {
            return operation(txClient);
        }, { timeout: 14500 });
    }
    catch (error) {
        throw new Error(`Database transaction failed: ${error}`);
    }
}
