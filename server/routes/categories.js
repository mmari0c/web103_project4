import express from 'express'
import { getCategories } from '../controllers/categories.js'
import { getRandomValues } from 'node:crypto'

const router = express.Router()

router.get('/', getCategories)

export default router