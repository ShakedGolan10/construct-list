import express from 'express'
import { createItem, deleteItem, updateItem, getItem, getItems } from './items.controller'

const router = express.Router()

router.post('/', createItem)
router.put('/', updateItem)
router.delete('/', deleteItem)
router.get('/:id', getItem)
router.get('/', getItems)

export default router
