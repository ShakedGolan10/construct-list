import { Request } from "express";
import { User } from "../../types/general.js";

export interface AuthenticatedReq extends Request {
    user: User
}

export interface LoginReq extends Request {
    body: _LoginPayload
}

export interface CreateUserReq extends Request {
    body: _CreateUserPayload
}

interface _LoginPayload {
    email: string;
    password: string
}

interface _CreateUserPayload {
    email: string;
    name: string;
    password: string; // Hashed password
}