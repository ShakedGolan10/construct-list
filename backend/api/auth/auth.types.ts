import { Request } from 'express';

export interface LoginReq extends Request {
  body: LoginPayload;
}

export interface CreateUserReq extends Request {
  body: CreateUserPayload;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreateUserPayload {
  email: string;
  fullname: string;
  password: string; // Hashed password
}
