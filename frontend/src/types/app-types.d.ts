export interface User {
  id: string;
  fullname: string;
  email: string;
  items?: Item[];
  createdAt?: string; // ISO date format
  updatedAt?: string; // ISO date format
}

export interface Item {
  id: string;
  name: string;
  category: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterCreds {
  email: string;
  password: string;
  fullname: string;
}

export interface LoginCreds {
  email: string;
  password: string;
}

export interface CreateItemData {
  name: string;
  category: string;
  image?: any;
}

export interface UpdateItemData {
  id: string;
  name?: string;
  category?: string;
  image?: any;
}
