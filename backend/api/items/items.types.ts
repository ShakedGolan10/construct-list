import { Request } from "express";
import { ParamsDictionary } from 'express-serve-static-core'

export interface GetItemParams extends ParamsDictionary {
    id: string
}

export interface CreateItemPayload {
    name: string;
    category: string;
}
export interface CreateManyItemPayload {
    data: {name: string, category: string, userId: string}[]
}

export interface DeleteItemPayload {
    id: string;
}

export interface UpdateItemPayload {
    id: string;
    name?: string;
    category?: string;
}

export interface CreateItemsReq extends Request<{}, any, CreateManyItemPayload> {}

export interface CreateItemReq extends Request<{}, any, CreateItemPayload> {}

export interface UpdateItemReq extends Request<{}, any, UpdateItemPayload> {}

export interface DeleteItemReq extends Request<{}, any, DeleteItemPayload> {}

export interface GetItemReq extends Request<GetItemParams> {}

export interface GetItemsReq extends Request {}