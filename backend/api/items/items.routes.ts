import express from 'express';
import {
  createItem,
  deleteItem,
  updateItem,
  getItem,
  getItems,
  createItems,
} from './items.controller';

const router = express.Router();

router.post('/single', createItem);
router.post('/', createItems);
router.put('/', updateItem);
router.delete('/', deleteItem);
router.get('/:id', getItem);
router.get('/', getItems);

export default router;
