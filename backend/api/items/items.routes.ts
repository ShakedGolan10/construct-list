import { Router } from 'express'
import { createItem, updateItem, deleteItem } from './items.controller'

const router = Router()

router.post('/', createItem)
router.put('/', updateItem)
router.delete('/', deleteItem)

export default router
