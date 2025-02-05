import { db } from '../../prisma/db';
import { CreateItemPayload, CreateManyItemPayload, UpdateItemPayload } from './items.types';

export const itemsService = {
  async createItem(payload: CreateItemPayload, userId?: string) {
    if (!userId) throw new Error('No user');
    return db.item.create({
      data: { ...payload, userId },
    });
  },
  async createItems(payload: CreateManyItemPayload) {
    return db.item.createMany({
      ...payload,
    });
  },

  async updateItem(payload: UpdateItemPayload) {
    return db.item.update({
      where: { id: payload.id },
      data: { name: payload.name, category: payload.category },
    });
  },

  async deleteItem(id: string) {
    return db.item.delete({
      where: { id },
    });
  },
  async getItem(id: string) {
    return db.item.findUnique({
      where: { id },
    });
  },

  async getItems(userId?: string) {
    return db.item.findMany({
      where: {
        userId: userId ? userId : '*',
      },
    });
  },
};
