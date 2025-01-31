import { Request } from "express";
import { User } from "../../types/general.js";

export interface AuthenticatedReq extends Request {
    user: User
}

export interface LoginReq extends Request {
    body: LoginPayload
}

export interface CreateUserReq extends Request {
    body: CreateUserPayload
}

export interface LoginPayload {
    email: string;
    password: string
}

export interface CreateUserPayload {
    email: string;
    fullname: string;
    password: string; // Hashed password
}