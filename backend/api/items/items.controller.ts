import { Response } from 'express'
import { itemsService } from './items.service'
import { CreateItemReq, DeleteItemReq, UpdateItemReq } from './items.types.js'

export async function createItem(req: CreateItemReq, res: Response) {
  try {
    const item = await itemsService.createItem(req.body, req.user?.id)
    res.json(item)
  } catch (err) {
    res.status(500).send(err)
  }
}

export async function updateItem(req: UpdateItemReq, res: Response) {
  try {
    const updated = await itemsService.updateItem(req.body, req.user?.id)
    res.json(updated)
  } catch (err) {
    res.status(500).send(err)
  }
}

export async function deleteItem(req: DeleteItemReq, res: Response) {
  try {
    const deleted = await itemsService.deleteItem(req.body.id, req.user?.id)
    res.json(deleted)
  } catch (err) {
    res.status(500).send(err)
  }
}
