import { Item, CreateItemData, UpdateItemData } from "../types/app-types"
import { httpService } from "./axios.service"

export const getItems = async (): Promise<Item[]> => {
   const items = await httpService.get<Item[]>('items')
   return items
}

export const getItem = async (userId: string): Promise<Item> => {
   const item = await httpService.get<Item>(`items/${userId}`)
   return item
}

export const createItem = async (data: CreateItemData): Promise<Item> => {
   const newItem = await httpService.post<Item>('items/single', data)
   return newItem
}

export const deleteItem = async (data: {id: string}): Promise<Item> => {
   return await httpService.delete<Item>('items', data) 
}

export const updateItem = async (data: UpdateItemData): Promise<Item> => {
   const updatedItem = await httpService.put<Item>('items', data)
   return updatedItem
}

