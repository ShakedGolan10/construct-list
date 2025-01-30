import { Request } from "express";

interface _CreateItemPayload {
    name: string;
    category: string;
}

interface _DeleteItemPayload {
    id: string;
}

interface _UpdateItemPayload {
    id: string;
    name?: string;
    category?: string;
}

export interface UpdateItemReq extends Request {
    body: _UpdateItemPayload;
}

export interface DeleteItemReq extends Request {
    body: _DeleteItemPayload;
}

export interface CreateItemReq extends Request {
    body: _CreateItemPayload;
}