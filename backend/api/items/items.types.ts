import { Request } from "express";

export interface CreateItemPayload {
    name: string;
    category: string;
}

export interface DeleteItemPayload {
    id: string;
}

export interface UpdateItemPayload {
    id: string;
    name?: string;
    category?: string;
}

export interface UpdateItemReq extends Request {
    body: UpdateItemPayload;
}

export interface DeleteItemReq extends Request {
    body: DeleteItemPayload;
}

export interface CreateItemReq extends Request {
    body: CreateItemPayload;
}