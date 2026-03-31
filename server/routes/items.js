import express from 'express'
import { getAllItems, getItemByCategory } from '../controllers/items.js'

const router = express.Router()

router.get('/', getAllItems)
router.get('/category/:categoryId', getItemByCategory)

export default router
