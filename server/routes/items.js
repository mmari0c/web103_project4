import express from 'express'
import { getItems, getItemsByCategory } from '../controllers/items.js'

const router = express.Router()

router.get('/', getItems)