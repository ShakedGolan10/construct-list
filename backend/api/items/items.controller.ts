import { Response, Request } from 'express';
import { itemsService } from './items.service';
import {
  CreateItemReq,
  DeleteItemReq,
  UpdateItemReq,
  GetItemReq,
  CreateItemsReq,
} from './items.types.js';

export async function createItem(req: CreateItemReq, res: Response) {
  try {
    const item = await itemsService.createItem(req.body, req.user.id);
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
export async function createItems(req: CreateItemsReq, res: Response) {
  try {
    const item = await itemsService.createItems(req.body);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function updateItem(req: UpdateItemReq, res: Response) {
  try {
    const updated = await itemsService.updateItem(req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function deleteItem(req: DeleteItemReq, res: Response) {
  try {
    const deleted = await itemsService.deleteItem(req.body.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getItem(req: GetItemReq, res: Response) {
  try {
    const item = await itemsService.getItem(req.params.id);
    if (!item) {
      res.status(404).send('Item not found');
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getItems(req: Request, res: Response) {
  try {
    const items = await itemsService.getItems(req.user?.id);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).send(err);
  }
}
