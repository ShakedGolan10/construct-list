"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSoftDeleteMiddleware = initSoftDeleteMiddleware;
function initSoftDeleteMiddleware(client) {
    client.$use(async (params, next) => {
        if (params.model === 'User' || params.model === 'Item' || params.model === 'Log') {
            if (params.action === 'delete') {
                params.action = 'update';
                params.args.data = { deletedAt: new Date() };
            }
            if (params.action === 'deleteMany') {
                params.action = 'updateMany';
                if (!params.args.data) {
                    params.args.data = {};
                }
                params.args.data.deletedAt = new Date();
            }
            if (params.action === 'findUnique' || params.action === 'findFirst') {
                params.action = 'findFirst';
                params.args.where = { ...params.args.where, deletedAt: null };
            }
            if (params.action === 'findMany') {
                if (!params.args.where) {
                    params.args.where = {};
                }
                if (params.args.where.deletedAt === undefined) {
                    params.args.where.deletedAt = null;
                }
            }
        }
        return next(params);
    });
}
