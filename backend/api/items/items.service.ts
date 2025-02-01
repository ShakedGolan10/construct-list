import { db } from "../../prisma/db"

export const itemsService = {
  async createItem(payload: { name: string, category: string }, userId?: string) {
    if (!userId) throw new Error('No user')
    return db.item.create({
      data: { ...payload, userId }
    })
  },

  async updateItem(payload: { id: string, name?: string, category?: string }, userId?: string) {
    if (!userId) throw new Error('No user')
    return db.item.update({
      where: { id: payload.id },
      data: { name: payload.name, category: payload.category }
    })
  },

  async deleteItem(id: string, userId?: string) {
    if (!userId) throw new Error('No user')
    return db.item.delete({
      where: { id },
    }, )
  },
  async getItem(id: string) {
    return db.item.findUnique({
      where: { id }
    })
  },

  async getItems(userId?: string) {
    return db.item.findMany({
        where: {
            userId: userId ? userId : '*'
        }
    })
  }
}

